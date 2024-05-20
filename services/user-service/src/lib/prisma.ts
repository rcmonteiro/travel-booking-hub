import { PrismaClient } from '../../prisma/generated/prisma-client.js'

export const db = new PrismaClient({
  log: ['warn', 'error'],
})
