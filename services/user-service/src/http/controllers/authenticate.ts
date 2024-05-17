import { compare } from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import type { ZodTypeProvider } from 'fastify-type-provider-zod';
import { z } from 'zod';

import { db } from '@/lib/prisma';
import { connectToRabbitMQ, sendMessageMQ } from 'message-broker';

import { BadRequestError } from './_errors/bad-request-error';

export const authenticate = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate with password',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
          401: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      const useExists = await db.user.findUnique({
        where: { email },
      })

      if (!useExists) {
        throw new BadRequestError('Invalid credentials')
      }

      if (useExists.passwordHash === null) {
        throw new BadRequestError(
          'User does not have a password, use social login',
        )
      }

      const passwordMatch = await compare(password, useExists.passwordHash)

      if (!passwordMatch) {
        throw new BadRequestError('Invalid credentials')
      }

      const token = await reply.jwtSign(
        {
          sub: useExists.id,
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      console.log('')
      console.log('User authenticated!')

      const queueName = 'user-service.events'
      const channel = await connectToRabbitMQ(queueName)
      await sendMessageMQ(channel,queueName,'user authenticated!')
      
      return reply.status(200).send({
        token,
      })
    },
  )
}
