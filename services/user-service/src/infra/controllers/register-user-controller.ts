import type { UserPublic } from '@tbh/core'
import { DomainEvents } from '@tbh/message-broker'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/use-cases/_errors/user-already-exists-error'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'

import { UserPresenter } from '../presenters/user-presenter'
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
      await DomainEvents.publish<UserPublic>(
        'user.created',
        UserPresenter.toHTTP(user),
      )

      return reply.status(201).send()
    },
  )
}
