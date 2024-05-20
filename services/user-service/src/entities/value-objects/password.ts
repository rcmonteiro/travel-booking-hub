import { compare, hash } from "bcryptjs"
import z from "zod"
import { ValueObject } from "./value-object"

const passwordSchema = z.string().min(3)

export class Password extends ValueObject<string>  {
  private readonly _value: string

  public constructor(passwordHash: string) {
    super(passwordHash)
    this._value = passwordHash
  }

  static isValid(value: string): boolean {
    return passwordSchema.safeParse(value).success
  }

  static async create(value: string): Promise<string> {
    const passwordHash = await hash(value, 6)
    return passwordHash
  }

  async compare(password: string): Promise<boolean> {
    return await compare(password, this._value)
  }

  public get value(): string {
    return this._value
  }
}