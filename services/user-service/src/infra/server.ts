import { env } from 'env'

import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.USER_SERVICE_PORT,
  })
  .then(() => {
    console.log('')
    console.log('🤘 MS User Service running!')
  })
