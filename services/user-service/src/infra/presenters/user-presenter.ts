import type { User } from 'core'

export abstract class UserPresenter {
  static toHTTP(user: User) {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email.toString(),
    }
  }
}
