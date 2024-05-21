import { Id, type User } from 'core'

import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async save(data: User): Promise<User> {
    const userIndex = this.items.findIndex((user) => user.id.equals(data.id))
    if (userIndex >= 0) {
      this.items[userIndex] = data
    }
    return this.items[userIndex]
  }

  async create(data: User): Promise<User> {
    this.items.push(data)
    return data
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((user) => user.email === email)
    if (!user) {
      return null
    }

    return user
  }

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((user) => user.id.equals(new Id(userId)))
    if (!user) {
      return null
    }

    return user
  }
}
