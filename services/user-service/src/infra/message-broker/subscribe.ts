import { rabbitMQ } from '@tbh/message-broker'

export const subscribe = async () => {
  await rabbitMQ.connect()
}
