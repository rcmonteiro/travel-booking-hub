import amqp from "amqplib";

export const sendMessageMQ = async (channel: amqp.Channel, queueName: string, message: string) => {
  console.log(`Mensagem enviada para a fila ${queueName}: ${message}`);
  channel.sendToQueue(queueName, Buffer.from(message));
};