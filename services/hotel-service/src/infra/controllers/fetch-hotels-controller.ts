import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/infra/middleware/auth'
import { makeFetchHotelsUseCase } from '@/use-cases/factories/make-fetch-hotels-use-case'

import { HotelPresenter } from '../presenters/hotel-presenter'
import { BadRequestError } from './_errors/bad-request-error'

export const fetchHotelsController = async (app: FastifyInstance) => {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .get(
      '/',
      {
        schema: {
          tags: ['Hotel'],
          summary: 'List available hotels',
          security: [{ bearerAuth: [] }],
          response: {
            200: z.object({
              hotels: z.array(
                z.object({
                  id: z.string().uuid(),
                  name: z.string().nullable(),
                }),
              ),
            }),
          },
        },
      },
      async (_, reply) => {
        const fetchHotels = makeFetchHotelsUseCase()
        const result = await fetchHotels.execute({ page: 1, limit: 10 })

        if (result.isLeft()) {
          throw new BadRequestError()
        }

        const { hotels } = result.value

        console.log('')
        console.log('Valid user, listing hotels')

        return reply.status(200).send({
          hotels: hotels.map(HotelPresenter.toHTTP),
        })
      },
    )
}
