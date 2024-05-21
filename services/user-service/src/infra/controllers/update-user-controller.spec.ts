import { Password } from 'core'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/infra/app'
import { db } from '@/lib/db'

describe('Update User Controller (e2e tests)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to update user', async () => {
    const { id: userId } = await db.user.create({
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

    const responseUpdate = await request(app.server)
      .put(`/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Updated Doe',
      })
    expect(responseUpdate.statusCode).toEqual(204)
  })
})
