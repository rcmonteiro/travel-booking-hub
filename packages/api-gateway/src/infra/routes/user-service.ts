import { env } from "@tbh/env"

export const userServiceConfig = {
  upstream: `${env.USER_SERVICE_URL}:${env.USER_SERVICE_PORT}`,
  prefix: '/users',
  rewritePrefix: '/',
  preValidation: async () => {
    console.log('')
    console.log('Received request for /users/*')
    console.log(`Sending to "${env.USER_SERVICE_URL}:${env.USER_SERVICE_PORT}"`)
  }
}