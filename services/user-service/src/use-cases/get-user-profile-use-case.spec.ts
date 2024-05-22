import { Id, Password, User } from '@tbh/core'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/test/in-memory-users-repository'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile-use-case'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get Profile Use Case (unit tests)', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able get user profile', async () => {
    const createdUser = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      passwordHash: await Password.create('123456'),
    })
    await usersRepository.create(createdUser)
    const result = await sut.execute({ userId: createdUser.id.toString() })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({
        id: expect.any(Id),
        name: 'John Doe',
        email: 'john@doe.com',
      }),
    })
  })

  it('should not be able to get user profile with wrong userId', async () => {
    const result = await sut.execute({ userId: 'non-existing-id' })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})
