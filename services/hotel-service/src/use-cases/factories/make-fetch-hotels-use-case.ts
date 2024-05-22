import { PrismaHotelsRepository } from '@/repositories/prisma/prisma-hotels-repository'

import { FetchHotelsUseCase } from '../fetch-hotels-use-case'

export const makeFetchHotelsUseCase = () => {
  const hotelsRepository = new PrismaHotelsRepository()
  const fetchHotelsUseCase = new FetchHotelsUseCase(hotelsRepository)

  return fetchHotelsUseCase
}
