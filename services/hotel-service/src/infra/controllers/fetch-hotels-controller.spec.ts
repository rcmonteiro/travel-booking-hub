import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/infra/app'
import { db } from '@/lib/db'

describe('Get User Profile Controller (e2e tests)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch hotels', async () => {
    await db.hotel.createMany({
      data: [{ name: 'Hotel Test 01' }, { name: 'Hotel Test 02' }],
    })
    const responseSut = await request(app.server).get(`/`).send()
    expect(responseSut.statusCode).toEqual(200)
    expect(responseSut.body.hotels).toHaveLength(2)
  })
})
