import { PrismaClient } from './generated/prisma-client.js'

const db = new PrismaClient()

const seed = async() => {
  await db.user.deleteMany()
}


seed().then(() => {
  console.log('Database seeded!')
})