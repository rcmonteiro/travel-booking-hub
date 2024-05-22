import type { User } from '@tbh/core'

export interface UsersRepository {
  create(data: User): Promise<User>
  save(data: User): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findById(userId: string): Promise<User | null>
}
