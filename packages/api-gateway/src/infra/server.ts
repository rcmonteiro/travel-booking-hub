import proxy from '@fastify/http-proxy'
import { env } from '@tbh/env'
import fastify from 'fastify'
import { hotelServiceConfig } from './routes/hotel-service'
import { userServiceConfig } from './routes/user-service'

const app = fastify()

app.register(proxy, userServiceConfig)
app.register(proxy, hotelServiceConfig)

app.listen({ port: env.API_GATEWAY_PORT }).then(() => {
  console.log('')
  console.log('🤘 API Gateway running!')
})
