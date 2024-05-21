import { type Either, left, right, User } from 'core'

import type { UsersRepository } from '@/repositories/users-repository'

import { ResourceNotFoundError } from './_errors/resource-not-found-error'

interface IGetProfileRequestDTO {
  userId: string
}

type IGetProfileResponseDTO = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IGetProfileRequestDTO): Promise<IGetProfileResponseDTO> {
    const user = await this.usersRepository.findById(data.userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    return right({
      user,
    })
  }
}
