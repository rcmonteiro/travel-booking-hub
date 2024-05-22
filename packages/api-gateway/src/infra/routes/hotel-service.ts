import { env } from "@tbh/env"

export const hotelServiceConfig = {
  upstream: `${env.HOTEL_SERVICE_URL}:${env.HOTEL_SERVICE_PORT}`,
  prefix: '/hotels',
  rewritePrefix: '/',
  preValidation: async () => {
    console.log('')
    console.log('Received request for /hotels/*')
    console.log(
      `Sending to "${env.HOTEL_SERVICE_URL}:${env.HOTEL_SERVICE_PORT}"`,
    )
  },
}