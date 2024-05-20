import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from 'env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { messageHandler } from '@/messages/message-handler'
import { connectToRabbitMQ, startConsumer } from 'message-broker'
import { listHotels } from './controllers/list-hotels'
import { errorHandler } from './error-handler'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Hotel Service - Travel Booking Hub',
      description:
        'Manages Hotel Booking and cancellations',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(listHotels)

app.listen({ port: env.HOTEL_SERVICE_PORT }).then(async () => {
  const queueName = 'user-service.events'
  const channel = await connectToRabbitMQ(queueName)
  await startConsumer(channel, queueName, messageHandler)

  console.log('')
  console.log('🤘 MS Hotel Service running!')
})
