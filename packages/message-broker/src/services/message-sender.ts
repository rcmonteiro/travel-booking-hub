import amqp from "amqplib";
import type { UserEvent } from "../events/user-event";

export const sendMessageMQ = async (channel: amqp.Channel, queueName: string, message: UserEvent) => {
  const strMessage = JSON.stringify(message)
  console.log(`Mensagem sent to: ${queueName}:`);
  console.log(message);
  channel.sendToQueue(queueName, Buffer.from(strMessage));
};