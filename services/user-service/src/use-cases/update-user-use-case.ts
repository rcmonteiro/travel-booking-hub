import { type Either, left, right, User } from '@tbh/core'

import type { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

interface IUpdateUserRequestDTO {
  userId: string
  name: string
}

type IUpdateUserResponseDTO = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IUpdateUserRequestDTO): Promise<IUpdateUserResponseDTO> {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.name = data.name
    this.usersRepository.save(user)

    return right({
      user,
    })
  }
}
