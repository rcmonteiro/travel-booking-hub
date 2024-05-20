import { db } from "@/lib/db"
import type { Prisma } from "@/lib/prisma"

export const updateUser = async (data: Prisma.UserSyncUncheckedCreateWithoutReservationsInput) => {

  await db.userSync.update({
    data: {
      name: data.name
    },
    where: {
      id: data.id
    }
  })
  console.log("User updated on User Model at Hotel Service:")
  console.log(data)
  
}