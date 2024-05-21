import { Id, Password, User } from 'core'
import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '@/repositories/test/in-memory-users-repository'

import { UpdateUserUseCase } from './update-user-use-case'

let usersRepository: InMemoryUsersRepository
let sut: UpdateUserUseCase

describe('Update User Use Case (unit tests)', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UpdateUserUseCase(usersRepository)
  })

  it('should be able update user profile', async () => {
    const createdUser = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      passwordHash: await Password.create('123456'),
    })
    await usersRepository.create(createdUser)
    const result = await sut.execute({
      userId: createdUser.id.toString(),
      name: 'John Updated Doe',
    })
    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: expect.objectContaining({
        id: expect.any(Id),
        name: 'John Updated Doe',
      }),
    })
  })
})
