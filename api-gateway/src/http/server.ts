import proxy from '@fastify/http-proxy'
import { env } from 'env'
import fastify from 'fastify'

const app = fastify()

app.register(proxy, {
  upstream: `${env.USER_SERVICE_URL}:${env.USER_SERVICE_PORT}`,
  prefix: '/user',
  rewritePrefix: '/',
  preValidation: async () => {
    console.log('')
    console.log('Received request for /user/*')
    console.log(`Sending to "${env.USER_SERVICE_URL}:${env.USER_SERVICE_PORT}"`)
  },
})

app.listen({ port: env.API_GATEWAY_PORT }).then(() => {
  console.log('')
  console.log('🤘 API Gateway running!')
})