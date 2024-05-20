import { User } from '@/entities/user'
import { Id } from '@/entities/value-objects/id'
import { Password } from '@/entities/value-objects/password'
import { InMemoryUsersRepository } from '@/repositories/test/in-memory-users-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './_errors/resource-not-found-error'
import { GetProfileUseCase } from './get-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetProfileUseCase

describe('Get Profile Use Case (unit tests)', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetProfileUseCase(usersRepository)
  })

  it('should be able get user profile', async () => {
    const createdUser = await User.create({
      name: 'John Doe',
      email: 'john@doe.com',
      passwordHash: await Password.create('123456'),
    })
    await usersRepository.create(createdUser)
    const { user } = await sut.execute({ userId: createdUser.id.toString() })
    expect(user.id).toEqual(expect.any(Id))
    expect(user.name).toEqual('John Doe')
    expect(user.email).toEqual('john@doe.com')
  })

  it('should not be able to get user profile with wrong userId', async () => {
    await expect(() =>
      sut.execute({ userId: 'non-existing-id' }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
