import { Entity } from './entity'
import type { Id } from './value-objects/id'

export interface IHotel {
  name: string
}

export interface HotelPublic {
  id: string
  name: string
}

export class Hotel extends Entity<IHotel> {
  static create(props: IHotel, id?: Id) {
    return new Hotel(
      {
        name: props.name,
      },
      id,
    )
  }

  public get name() {
    return this.props.name
  }

  public set name(name: string) {
    this.props.name = name
  }
}
