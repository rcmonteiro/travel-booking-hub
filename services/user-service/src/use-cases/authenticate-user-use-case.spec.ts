import { Id, Password, User } from 'core'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/test/in-memory-users-repository'

import { InvalidCredentialsError } from './_errors/invalid-credentials-error'
import { AuthenticateUserUseCase } from './authenticate-user-use-case'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUserUseCase

describe('Authenticate Use Case (unit tests)', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUserUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const createdUser = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      passwordHash: await Password.create('123456'),
    })
    await usersRepository.create(createdUser)

    const result = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({ id: expect.any(Id) }),
    })
  })

  it('should not be able to authenticate with wrong email', async () => {
    const result = await sut.execute({
      email: 'john@doe.com',
      password: '123456',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    const createdUser = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      passwordHash: await Password.create('123456'),
    })
    await usersRepository.create(createdUser)

    const result = await sut.execute({
      email: 'john@doe.com',
      password: '1234567',
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(InvalidCredentialsError)
  })
})
