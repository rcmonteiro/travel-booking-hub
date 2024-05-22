import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { auth } from '@/http/middleware/auth'
import { db } from '@/lib/db'

export const listHotels = async (app: FastifyInstance) => {
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
      async (request, reply) => {
        const hotels = await db.hotel.findMany({
          select: {
            id: true,
            name: true,
          },
        })

        console.log('')
        console.log('Valid user, listing hotels')

        return reply.status(200).send({
          hotels,
        })
      },
    )
}
