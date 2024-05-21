import { db } from "@/lib/db"

export const updateUser = async (user: any) => {

  await db.userSync.update({
    data: {
      name: user.name
    },
    where: {
      id: user.id
    }
  })
  console.log("User updated on User Model at Hotel Service:")
  console.log(user)
  
}