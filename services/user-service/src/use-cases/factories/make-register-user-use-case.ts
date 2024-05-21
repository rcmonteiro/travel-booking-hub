import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { RegisterUserUseCase } from '../register-user-use-case'

export const makeRegisterUserUseCase = () => {
  const usersRepository = new PrismaUsersRepository()
  const registerUserUseCase = new RegisterUserUseCase(usersRepository)

  return registerUserUseCase
}
