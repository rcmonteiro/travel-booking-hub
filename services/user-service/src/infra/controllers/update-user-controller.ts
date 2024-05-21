import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { connectToRabbitMQ, sendMessageMQ } from 'message-broker'
import type { UserEvent } from 'message-broker/src/events/user-event'
import { z } from 'zod'

import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { makeUpdateUserUseCase } from '@/use-cases/factories/make-update-user-use-case'

import { auth } from '../middleware/auth'
import { BadRequestError } from './_errors/bad-request-error'

export const updateUserController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .put(
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
          }),
        },
      },
      async (request, reply) => {
        const { name } = request.body
        const userId = request.params.id

        const updateUser = makeUpdateUserUseCase()
        const result = await updateUser.execute({
          userId,
          name,
        })

        if (result.isLeft()) {
          const error = result.value
          switch (error.constructor) {
            case ResourceNotFoundError:
              throw new BadRequestError(error.message)
            default:
              throw new BadRequestError(error.message)
          }
        }

        const { user } = result.value

        const queueName = 'user-service.events'
        const channel = await connectToRabbitMQ(queueName)
        const message: UserEvent = {
          event: 'user.updated',
          data: {
            id: user.id.toString(),
            name,
            email: user.email,
          },
        }
        await sendMessageMQ(channel, queueName, message)

        return reply.status(204).send()
      },
    )
}
