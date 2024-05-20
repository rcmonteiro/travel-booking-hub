import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetProfileUseCase } from '../get-profile'

export const makeGetProfileUseCase = () => {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetProfileUseCase(usersRepository)

  return getProfileUseCase
}
