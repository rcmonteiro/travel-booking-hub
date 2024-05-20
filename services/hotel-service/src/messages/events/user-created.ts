import { db } from "@/lib/db"
import type { Prisma } from "@/lib/prisma"

export const createUser = async (data: Prisma.UserSyncUncheckedCreateWithoutReservationsInput) => {

  const userSameEmail = await db.userSync.findUnique({
    where: {
      email: data.email
    }
  })

  console.log(userSameEmail)

  if (!userSameEmail) {
    const user = await db.userSync.create({
      data,
    })
    console.log("User created on User Model at Hotel Service:")
    console.log(user)
  }
  
}