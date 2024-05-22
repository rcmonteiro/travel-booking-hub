import { type Hotel } from '@tbh/core'

import type {
  HotelFindManyParams,
  HotelsRepository,
} from '../hotels-repository'

export class InMemoryHotelsRepository implements HotelsRepository {
  public items: Hotel[] = []

  async create(data: Hotel): Promise<Hotel> {
    this.items.push(data)
    return data
  }

  async findMany({ page, limit }: HotelFindManyParams): Promise<Hotel[]> {
    const hotels = this.items.slice((page - 1) * limit, page * limit)
    return hotels
  }
}
