import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

import { GetUserProfileUseCase } from '../get-user-profile-use-case'

export const makeGetUserProfileUseCase = () => {
  const usersRepository = new PrismaUsersRepository()
  const getProfileUseCase = new GetUserProfileUseCase(usersRepository)

  return getProfileUseCase
}
