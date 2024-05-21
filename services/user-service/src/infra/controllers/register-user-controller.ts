import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { connectToRabbitMQ, sendMessageMQ } from 'message-broker'
import type { UserEvent } from 'message-broker/src/events/user-event'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/_errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

import { BadRequestError } from './_errors/bad-request-error'

export const registerUserController = async (app: FastifyInstance) => {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/',
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

      const registerUser = makeRegisterUserUseCase()
      const result = await registerUser.execute({ name, email, password })

      if (result.isLeft()) {
        const error = result.value
        switch (error.constructor) {
          case UserAlreadyExistsError:
            throw new BadRequestError(error.message)
          default:
            throw new BadRequestError(error.message)
        }
      }

      const { user } = result.value

      const queueName = 'user-service.events'
      const channel = await connectToRabbitMQ(queueName)
      const message: UserEvent = {
        event: 'user.created',
        data: {
          id: user.id.toString(),
          name,
          email,
        },
      }
      await sendMessageMQ(channel, queueName, message)

      return reply.status(201).send()
    },
  )
}