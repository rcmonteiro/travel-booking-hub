import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/infra/middleware/auth'
import { ResourceNotFoundError } from '@/use-cases/_errors/resource-not-found-error'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

import { UserPresenter } from '../presenters/user-presenter'
import { BadRequestError } from './_errors/bad-request-error'

export const getUserProfileController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/profile',
      {
        schema: {
          tags: ['Auth'],
          summary: 'Get authenticated profile',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              user: z.object({
                id: z.string().uuid(),
                name: z.string().nullable(),
                email: z.string().email(),
              }),
            }),
          },
        },
      },
      async (request, reply) => {
        const userId = await request.getCurrentUserId()

        const getProfile = makeGetUserProfileUseCase()
        const result = await getProfile.execute({ userId })

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

        console.log('')
        console.log('Valid user, sending his profile')

        return reply.status(200).send({
          user: UserPresenter.toHTTP(user),
        })
      },
    )
}
