import { faker } from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

const seed = async() => {
  await db.reservation.deleteMany()
  await db.hotel.deleteMany()
  await db.userSync.deleteMany()
 
  await db.hotel.createMany({
    data: Array.from({length: 10}).map(index => (
      {
        name: faker.company.name()
      }
    )),
  })
}


seed().then(() => {
  console.log('Database seeded!')
})