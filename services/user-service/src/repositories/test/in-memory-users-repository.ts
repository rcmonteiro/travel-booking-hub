import type { User } from '@/entities/user'
import { Id } from '@/entities/value-objects/id'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  save(data: User): Promise<User> {
    throw new Error('Method not implemented.')
  }
  public items: User[] = []

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
