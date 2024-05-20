import { PrismaClient } from '../src/lib/prisma'

const db = new PrismaClient()

const seed = async() => {
  await db.user.deleteMany()
}


seed().then(() => {
  console.log('Database seeded!')
})