import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { db } from '@/lib/prisma'

import { connectToRabbitMQ, sendMessageMQ } from 'message-broker'
import type { UserEvent } from 'message-broker/src/events/user-event'
import { auth } from '../middleware/auth'
import { BadRequestError } from './_errors/bad-request-error'

export const updateAccount = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().register(auth).put(
    '/:id',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Update account',
        body: z.object({
          name: z.string(),
        }),
        params: z.object({
          id: z.string().uuid(),
        })
      },
    },
    async (request, reply) => {
      const { name } = request.body
      const id = request.params.id

      const user = await db.user.findUnique({
        where: { id },
      })

      if (!user) {
        throw new BadRequestError('User not found')
      }

      await db.user.update({
        data: {
          name,
        },
        where: { id },
      })

      const queueName = 'user-service.events'
      const channel = await connectToRabbitMQ(queueName)
      const message: UserEvent = { 
        event: 'user.updated',
        data: {
          id: user.id,
          name,
          email: user.email
        },
      }
      await sendMessageMQ(channel,queueName,message)

      return reply.status(204).send()
    },
  )
}
