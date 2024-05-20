import amqp from "amqplib";
import { env } from "env";
export * from './services/message-receiver';
export * from './services/message-sender';

export const connectToRabbitMQ = async (queueName: string) => {
  try {
    const connection = await amqp.connect(env.MQ_URL);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    return channel;
  } catch (error) {
    console.error('Failed to connect to RabbitMQ:', error);
    throw error;
  }
}