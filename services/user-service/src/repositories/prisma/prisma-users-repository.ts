import type { User } from 'core'

import { db } from '@/lib/db'

import type { UsersRepository } from '../users-repository'
import { UserMapper } from './mappers/user-mapper'

export class PrismaUsersRepository implements UsersRepository {
  async create(data: User): Promise<User> {
    const user = await db.user.create({
      data: {
        id: data.id.toString(),
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash?.value,
      },
    })
    return await UserMapper.toDomain(user)
  }

  async save(data: User): Promise<User> {
    const user = await db.user.update({
      where: {
        id: data.id.toString(),
      },
      data: {
        name: data.name,
      },
    })
    return await UserMapper.toDomain(user)
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (!user) {
      return null
    }

    return await UserMapper.toDomain(user)
  }

  async findById(userId: string): Promise<User | null> {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (!user) {
      return null
    }

    return await UserMapper.toDomain(user)
  }
}
