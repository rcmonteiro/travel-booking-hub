import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'


import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { connectToRabbitMQ, sendMessageMQ } from 'message-broker'
import type { UserEvent } from 'message-broker/src/events/user-event'

export const registerController = async (app: FastifyInstance) => {
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

      const registerUseCase = makeRegisterUseCase()
      const { user } = await registerUseCase.execute({ name, email, password })

      const queueName = 'user-service.events'
      const channel = await connectToRabbitMQ(queueName)
      const message: UserEvent = { 
        event: 'user.created',
        data: {
          id: user.id.toString(),
          name,
          email
        },
      }
      await sendMessageMQ(channel,queueName,message)

      return reply.status(201).send()
    },
  )
}
