import { DomainEvents, rabbitMQ } from '@tbh/message-broker'

import { createUser } from './events/user-created'
import { updateUser } from './events/user-updated'

export const subscribe = async () => {
  await rabbitMQ.connect()
  await DomainEvents.listen('user.created')
  await DomainEvents.listen('user.updated')

  DomainEvents.subscribe('user.created', createUser.bind(this))
  DomainEvents.subscribe('user.updated', updateUser.bind(this))
}
