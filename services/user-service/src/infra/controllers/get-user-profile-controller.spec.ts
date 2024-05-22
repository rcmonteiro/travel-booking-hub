import { Password } from '@tbh/core'
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

  it('should be able to update user', async () => {
    await db.user.create({
      data: {
        name: 'John Doe',
        email: 'john@doe.com',
        passwordHash: await Password.create('123456'),
      },
    })

    const responseSignin = await request(app.server).post('/sessions').send({
      email: 'john@doe.com',
      password: '123456',
    })

    const { token } = responseSignin.body

    const responseSut = await request(app.server)
      .get(`/profile`)
      .set('Authorization', `Bearer ${token}`)
      .send()
    expect(responseSut.statusCode).toEqual(200)
    expect(responseSut.body.user).toEqual(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@doe.com',
      }),
    )
  })
})
