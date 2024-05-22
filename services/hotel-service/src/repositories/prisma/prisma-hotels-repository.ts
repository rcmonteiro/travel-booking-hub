import type { Hotel } from '@tbh/core'

import { db } from '@/lib/db'

import type {
  HotelFindManyParams,
  HotelsRepository,
} from '../hotels-repository'
import { HotelMapper } from './mappers/hotel-mapper'

export class PrismaHotelsRepository implements HotelsRepository {
  async create(data: Hotel): Promise<Hotel> {
    const hotel = await db.hotel.create({
      data: {
        id: data.id.toString(),
        name: data.name,
      },
    })
    return HotelMapper.toDomain(hotel)
  }

  async findMany({ page, limit }: HotelFindManyParams): Promise<Hotel[]> {
    const hotels = await db.hotel.findMany({
      take: limit,
      skip: (page - 1) * limit,
    })
    return hotels.map(HotelMapper.toDomain)
  }
}
