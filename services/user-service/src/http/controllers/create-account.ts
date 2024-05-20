import { hash } from 'bcryptjs'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { db } from '@/lib/prisma'

import { BadRequestError } from './_errors/bad-request-error'

export const createAccount = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/register',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Create a new account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password } = request.body

      const useWithSameEmailExists = await db.user.findUnique({
        where: { email },
      })

      if (useWithSameEmailExists) {
        throw new BadRequestError('User already exists')
      }

      const hashedPassword = await hash(password, 6)

      await db.user.create({
        data: {
          name,
          email,
          passwordHash: hashedPassword,
        },
      })

      return reply.status(201).send()
    },
  )
}
