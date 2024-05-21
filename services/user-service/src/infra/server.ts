import { env } from 'env'

import { app } from './app'
import { subscribe } from './message-broker/subscribe'

app
  .listen({
    host: '0.0.0.0',
    port: env.USER_SERVICE_PORT,
  })
  .then(() => {
    subscribe().catch(console.error)
    console.log('')
    console.log('🤘 MS User Service running!')
  })
