import z from "zod"
import { ValueObject } from "./value-object"

const emailSchema = z.string().email()

export class Email extends ValueObject<string>  {
  private _value: string

  constructor(value: string) {
    super(value)
    if (!Email.isValid(value)) {
      throw new Error('Invalid email')
    }
    this._value = value
  }

  static isValid(value: string): boolean {
    return emailSchema.safeParse(value).success
  }

  public get value(): string {
    return this._value
  }
}