import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/infra/app'

describe('Register User Controller (e2e tests)', async () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new user', async () => {
    const responseSignup = await request(app.server).post('/').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })
    expect(responseSignup.statusCode).toEqual(201)
  })
})
