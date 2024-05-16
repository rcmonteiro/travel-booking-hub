import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    GATEWAY_PORT: z.coerce.number().default(4000),
    USER_API_PORT: z.coerce.number().default(4001),
    HOTEL_API_PORT: z.coerce.number().default(4002),
    FLIGHT_API_PORT: z.coerce.number().default(4003),

    USER_DB_URL: z.string().url(),
    HOTEL_DB_URL: z.string().url(),
    FLIGHT_DB_URL: z.string().url(),

    JWT_SECRET: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    GATEWAY_PORT: process.env.GATEWAY_PORT,
    USER_API_PORT: process.env.USER_API_PORT,
    HOTEL_API_PORT: process.env.HOTEL_API_PORT,
    FLIGHT_API_PORT: process.env.FLIGHT_API_PORT,
    USER_DB_URL: process.env.USER_DB_URL,
    HOTEL_DB_URL: process.env.HOTEL_DB_URL,
    FLIGHT_DB_URL: process.env.FLIGHT_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  emptyStringAsUndefined: true,
})
