import { DomainEvents, rabbitMQ } from 'message-broker';
import { createUser } from './events/user-created';
import { updateUser } from './events/user-updated';

export const subscribe = async () => {
  await rabbitMQ.connect()
  await DomainEvents.listen('user.created');
  await DomainEvents.listen('user.updated');

  DomainEvents.subscribe('user.created', async (data) => {
    await createUser(data)
  });
  
  DomainEvents.subscribe('user.updated', async (data) => {
    await updateUser(data)
  });
}
