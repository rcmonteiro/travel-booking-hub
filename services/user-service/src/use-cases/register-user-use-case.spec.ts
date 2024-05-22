import { Id } from '@tbh/core'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/test/in-memory-users-repository'

import { UserAlreadyExistsError } from './_errors/user-already-exists-error'
import { RegisterUserUseCase } from './register-user-use-case'

const sampleUserInput = {
  name: 'John Doe',
  email: 'john@doe.com',
  password: '123456',
}

let usersRepository: InMemoryUsersRepository
let sut: RegisterUserUseCase

describe('Register Use Case (unit tests)', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUserUseCase(usersRepository)
  })

  it('should be able to register', async () => {
    const result = await sut.execute(sampleUserInput)
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({ id: expect.any(Id) }),
    })
  })

  it('should hash the password upon registration', async () => {
    const result = await sut.execute(sampleUserInput)
    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      const user = result.value.user
      const passwordMatches = await user.passwordHash?.compare('123456')
      expect(passwordMatches).toBe(true)
    }
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute(sampleUserInput)
    const result = await sut.execute(sampleUserInput)
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})
