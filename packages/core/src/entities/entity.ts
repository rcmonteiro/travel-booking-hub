import { Id } from './value-objects/id'

export abstract class Entity<Props> {
  private _id: Id
  protected props: Props

  protected constructor(props: Props, id?: Id) {
    this.props = props
    this._id = id ?? new Id()
  }

  public equals(entity: Entity<Props>): boolean {
    if (this === entity) return true
    return this._id.equals(entity._id)
  }

  get id() {
    return this._id
  }
}
