import { db } from "@/lib/prisma"
import type { Prisma } from "prisma/generated/prisma-client.js"

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