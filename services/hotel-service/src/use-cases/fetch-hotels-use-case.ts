import { type Either, type Hotel, right } from '@tbh/core'

import type { HotelsRepository } from '@/repositories/hotels-repository'

interface IFetchHotelsRequestDTO {
  page: number
  limit: number
}

type IFetchHotelsResponseDTO = Either<
  null,
  {
    hotels: Hotel[]
  }
>

export class FetchHotelsUseCase {
  constructor(private hotelsRepository: HotelsRepository) {}

  async execute(
    data: IFetchHotelsRequestDTO,
  ): Promise<IFetchHotelsResponseDTO> {
    const hotels = await this.hotelsRepository.findMany({
      page: data.page,
      limit: data.limit,
    })

    return right({
      hotels,
    })
  }
}
