import { rabbitMQ } from 'message-broker'

export const subscribe = async () => {
  await rabbitMQ.connect()
}
