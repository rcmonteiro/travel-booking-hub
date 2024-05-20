import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/infra/middleware/auth'

import { makeGetProfileUseCase } from '@/use-cases/factories/make-get-profile-use-case'
import { UserPresenter } from '../presenters/user-presenter'

export const getProfileController = async (app: FastifyInstance) => {
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
        
        const getProfileUseCase = makeGetProfileUseCase()
        const { user } = await getProfileUseCase.execute({ userId })

        console.log('')
        console.log('Valid user, sending his profile')

        return reply.status(200).send({
          user: UserPresenter.toHTTP(user),
        })
      },
    )
}
