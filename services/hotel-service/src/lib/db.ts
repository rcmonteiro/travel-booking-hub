import { PrismaClient } from './prisma'

export const db = new PrismaClient({
  log: ['warn', 'error'],
})
