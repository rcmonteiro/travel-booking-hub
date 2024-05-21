import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { InvalidCredentialsError } from '@/use-cases/_errors/invalid-credentials-error'
import { makeAuthenticateUserUseCase } from '@/use-cases/factories/make-authenticate-user-use-case'

import { BadRequestError } from './_errors/bad-request-error'
import { UnauthorizedError } from './_errors/unauthorized-error'

export const authenticateUserController = async (app: FastifyInstance) => {
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

      const authenticateUser = makeAuthenticateUserUseCase()
      const result = await authenticateUser.execute({ email, password })

      if (result.isLeft()) {
        const error = result.value
        switch (error.constructor) {
          case InvalidCredentialsError:
            throw new UnauthorizedError(error.message)
          default:
            throw new BadRequestError(error.message)
        }
      }

      const { user } = result.value

      const token = await reply.jwtSign(
        {
          sub: user.id.toString(),
        },
        {
          sign: {
            expiresIn: '7d',
          },
        },
      )

      return reply.status(200).send({
        token,
      })
    },
  )
}
