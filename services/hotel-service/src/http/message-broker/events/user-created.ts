import { db } from "@/lib/db"

export const createUser = async (user: any) => {
  const userSameEmail = await db.userSync.findUnique({
    where: {
      email: user.email
    }
  })

  if (!userSameEmail) {
    await db.userSync.create({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
    console.log("User created on User Model at Hotel Service:")
    console.log(user)
  }
  
}