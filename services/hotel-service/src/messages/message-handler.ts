import type { UserEvent } from "message-broker/src/events/user-event";
import { createUser } from "./events/user-created";
import { updateUser } from "./events/user-updated";

export const messageHandler = async (msg: string | null) => {
  if (msg) {
    const objMessage: UserEvent = JSON.parse(msg)
    console.log('Received message:')
    console.log(objMessage)
    switch(objMessage.event) {
      case 'user.created':
        await createUser(objMessage.data)
        break;
      case 'user.updated':
        await updateUser(objMessage.data)
        break;
      default:
        throw new Error('Invalid event')
    }

  }
};