import amqp, { Channel, Connection, ConsumeMessage } from 'amqplib'
import { env } from 'env'

class RabbitMQ {
  private connection: Connection | null = null
  private channel: Channel | null = null

  async connect(): Promise<void> {
    this.connection = await amqp.connect(env.MQ_URL)
    this.channel = await this.connection.createChannel()
  }

  async createQueue(queue: string): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized')
    await this.channel.assertQueue(queue, { durable: true })
  }

  async sendToQueue(queue: string, message: string): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized')
    this.channel.sendToQueue(queue, Buffer.from(message))
  }

  async consumeQueue(
    queue: string,
    callback: (msg: ConsumeMessage | null) => void,
  ): Promise<void> {
    if (!this.channel) throw new Error('Channel is not initialized')
    await this.channel.consume(queue, callback, { noAck: true })
  }

  async close(): Promise<void> {
    if (this.channel) await this.channel.close()
    if (this.connection) await this.connection.close()
  }
}

export const rabbitMQ = new RabbitMQ()
