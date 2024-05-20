import { User } from '@/entities/user'
import { Id } from '@/entities/value-objects/id'
import { Prisma, User as PrismaUser } from '@/lib/prisma'

export abstract class UserMapper {
  public static async toDomain(raw: PrismaUser): Promise<User> {
    return await User.create(
      {
        name: raw.name,
        email: raw.email,
        passwordHash: raw.passwordHash,
      },
      new Id(raw.id),
    )
  }

  public static toPrisma(user: User): Prisma.UserUncheckedCreateInput {
    return {
      id: user.id.toString(),
      name: user.name,
      email: user.email,
      passwordHash: user.passwordHash,
    }
  }
}