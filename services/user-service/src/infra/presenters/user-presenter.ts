import type { User, UserPublic } from 'core'

export abstract class UserPresenter {
  static toHTTP(user: User): UserPublic {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.toString(),
    }
  }
}
