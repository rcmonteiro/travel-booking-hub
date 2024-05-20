import amqp from "amqplib";

export const consumeMessagesMQ = async (
  channel: amqp.Channel,
  queueName: string,
  messageHandler: (msg: string | null) => void
) => {
  await channel.assertQueue(queueName, {
    durable: false,
  });

  console.log(`Waiting for messages in queue: ${queueName}`);
  
  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      messageHandler(msg.content.toString());
      channel.ack(msg);
    }
  });
};

export const startConsumer = async (channel: amqp.Channel, queueName: string, messageHandler: (msg: string | null) => void) => {
  try {   
    await consumeMessagesMQ(channel, queueName, messageHandler);
  } catch (error) {
    console.error("Error in consumer:", error);
  }
}
