import type { Hotel } from '@tbh/core'

export interface HotelFindManyParams {
  page: number
  limit: number
}

export interface HotelsRepository {
  create(data: Hotel): Promise<Hotel>
  findMany({ page, limit }: HotelFindManyParams): Promise<Hotel[]>
}
