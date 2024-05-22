import type { Hotel, HotelPublic } from '@tbh/core'

export abstract class HotelPresenter {
  static toHTTP(hotel: Hotel): HotelPublic {
    return {
      id: hotel.id.toString(),
      name: hotel.name,
    }
  }
}
