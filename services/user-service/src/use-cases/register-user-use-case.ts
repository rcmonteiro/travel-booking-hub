import { type Either, left, Password, right, User } from '@tbh/core'

import type { UsersRepository } from '@/repositories/users-repository'

import { UserAlreadyExistsError } from './_errors/user-already-exists-error'

interface IRegisterRequestDTO {
  name: string
  email: string
  password: string
}

type IRegisterResponseDTO = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IRegisterRequestDTO): Promise<IRegisterResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      return left(new UserAlreadyExistsError())
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash: await Password.create(data.password),
    })
    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}
