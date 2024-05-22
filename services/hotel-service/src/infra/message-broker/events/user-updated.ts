import type { UserPublic } from '@tbh/core'

import { db } from '@/lib/db'

export const updateUser = async (user: UserPublic) => {
  await db.userSync.update({
    data: {
      name: user.name,
    },
    where: {
      id: user.id,
    },
  })
  console.log('User updated on User Model at Hotel Service:')
  console.log(user)
}
