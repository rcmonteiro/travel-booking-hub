import { randomUUID } from 'node:crypto'

export class Id {
  private _value: string

  constructor(value?: string) {
    this._value = value ?? randomUUID()
  }

  public toString() {
    return this._value
  }

  public toValue() {
    return this._value
  }

  public equals(id: Id): boolean {
    return id.toValue() === this._value
  }
}
