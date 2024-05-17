import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  server: {
    API_GATEWAY_PORT: z.coerce.number().default(4000),
    USER_SERVICE_PORT: z.coerce.number().default(4001),
    HOTEL_SERVICE_PORT: z.coerce.number().default(4002),
    FLIGHT_SERVICE_PORT: z.coerce.number().default(4003),

    API_GATEWAY_URL: z.string().url(),
    USER_SERVICE_URL: z.string().url(),
    HOTEL_SERVICE_URL: z.string().url(),
    FLIGHT_SERVICE_URL: z.string().url(),

    USER_SERVICE_DB_URL: z.string().url(),
    HOTEL_SERVICE_DB_URL: z.string().url(),
    FLIGHT_SERVICE_DB_URL: z.string().url(),

    JWT_SECRET: z.string(),
  },
  client: {},
  shared: {},
  runtimeEnv: {
    API_GATEWAY_PORT: process.env.API_GATEWAY_PORT,
    USER_SERVICE_PORT: process.env.USER_SERVICE_PORT,
    HOTEL_SERVICE_PORT: process.env.HOTEL_SERVICE_PORT,
    FLIGHT_SERVICE_PORT: process.env.FLIGHT_SERVICE_PORT,
    API_GATEWAY_URL: process.env.API_GATEWAY_URL,
    USER_SERVICE_URL: process.env.USER_SERVICE_URL,
    HOTEL_SERVICE_URL: process.env.HOTEL_SERVICE_URL,
    FLIGHT_SERVICE_URL: process.env.FLIGHT_SERVICE_URL,
    USER_SERVICE_DB_URL: process.env.USER_SERVICE_DB_URL,
    HOTEL_SERVICE_DB_URL: process.env.HOTEL_SERVICE_DB_URL,
    FLIGHT_SERVICE_DB_URL: process.env.FLIGHT_SERVICE_DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
  },
  emptyStringAsUndefined: true,
})
