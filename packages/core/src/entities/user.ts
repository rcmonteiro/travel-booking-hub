import { Entity } from './entity'
import { Email } from './value-objects/email'
import type { Id } from './value-objects/id'
import { Password } from './value-objects/password'

export interface IUser {
  name: string
  email: Email
  passwordHash?: Password | null
}

export interface NewUser {
  name: string
  email: string
  passwordHash?: string | null
}

export class User extends Entity<IUser> {
  static async create(props: NewUser, id?: Id) {
    return new User(
      {
        name: props.name,
        email: new Email(props.email),
        passwordHash: props.passwordHash
          ? new Password(props.passwordHash)
          : null,
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

  public get email() {
    return this.props.email.value
  }

  public get passwordHash() {
    return this.props.passwordHash
  }
}
