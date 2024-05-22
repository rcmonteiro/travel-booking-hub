import { execSync } from 'node:child_process'
import { randomUUID } from 'node:crypto'

import { Environment } from 'vitest'

import { PrismaClient } from '../../src/lib/prisma'

const prisma = new PrismaClient()

const generateDatabaseURL = (schema: string) => {
  if (!process.env.HOTEL_SERVICE_DB_URL) {
    throw new Error(
      'Please provide a HOTEL_SERVICE_DB_URL environment variable.',
    )
  }
  const url = new URL(process.env.HOTEL_SERVICE_DB_URL)
  url.searchParams.set('schema', schema)
  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const sutDataBaseURL = generateDatabaseURL(schema)
    process.env.USER_SERVICE_DB_URL = sutDataBaseURL
    execSync('npx prisma migrate deploy')
    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
      },
    }
  },
}
