import { PrismaClient } from '@/lib/prisma'

export const db = new PrismaClient({
  log: ['warn', 'error'],
})
