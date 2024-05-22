import { type Either, left, right, User } from '@tbh/core'

import type { UsersRepository } from '@/repositories/users-repository'

import { InvalidCredentialsError } from './_errors/invalid-credentials-error'

interface IAuthenticateRequestDTO {
  email: string
  password: string
}

type IAuthenticateResponseDTO = Either<
  InvalidCredentialsError,
  {
    user: User
  }
>

export class AuthenticateUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(
    data: IAuthenticateRequestDTO,
  ): Promise<IAuthenticateResponseDTO> {
    const user = await this.usersRepository.findByEmail(data.email)

    if (!user || !user.passwordHash) {
      return left(new InvalidCredentialsError())
    }

    const passwordMatch = await user.passwordHash.compare(data.password)

    if (!passwordMatch) {
      return left(new InvalidCredentialsError())
    }

    return right({
      user,
    })
  }
}
