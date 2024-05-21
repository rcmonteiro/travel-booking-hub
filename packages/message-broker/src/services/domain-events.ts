import { rabbitMQ } from './rabbitmq'

type EventHandler = (data: unknown) => void

class DomainEvents {
  private static handlers: Record<string, EventHandler[]> = {}

  static async publish<T>(event: string, data: T): Promise<void> {
    const message = JSON.stringify({ event, data })
    await rabbitMQ.sendToQueue(event, message)
  }

  static subscribe(event: string, handler: EventHandler): void {
    if (!this.handlers[event]) {
      this.handlers[event] = []
    }
    this.handlers[event].push(handler)
  }

  static async listen(event: string): Promise<void> {
    await rabbitMQ.createQueue(event)
    await rabbitMQ.consumeQueue(event, (msg) => {
      if (msg) {
        const messageContent = msg.content.toString()
        const { data } = JSON.parse(messageContent)
        this.handlers[event].forEach((handler) => handler(data))
      }
    })
  }
}

export { DomainEvents }
