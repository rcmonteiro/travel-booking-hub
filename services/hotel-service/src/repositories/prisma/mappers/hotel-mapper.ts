import { Hotel, Id } from '@tbh/core'

import { Hotel as PrismaHotel, Prisma } from '@/lib/prisma'

export abstract class HotelMapper {
  public static toDomain(raw: PrismaHotel): Hotel {
    return Hotel.create(
      {
        name: raw.name,
      },
      new Id(raw.id),
    )
  }

  public static toPrisma(hotel: Hotel): Prisma.HotelUncheckedCreateInput {
    return {
      id: hotel.id.toString(),
      name: hotel.name,
    }
  }
}
