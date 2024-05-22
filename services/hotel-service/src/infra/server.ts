import { env } from '@tbh/env'

import { app } from './app'
import { subscribe } from './message-broker/subscribe'

app.listen({ port: env.HOTEL_SERVICE_PORT }).then(async () => {
  subscribe().catch(console.error)

  console.log('')
  console.log('🤘 MS Hotel Service running!')
})
