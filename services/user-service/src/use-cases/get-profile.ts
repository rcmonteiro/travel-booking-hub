import { User } from "@/entities/user";
import type { UsersRepository } from "@/repositories/users-repository";
import { ResourceNotFoundError } from "./_errors/resource-not-found-error";

interface IGetProfileRequestDTO {
  userId: string
}

interface IGetProfileResponseDTO {
  user: User
}

export class GetProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IGetProfileRequestDTO): Promise<IGetProfileResponseDTO> {
    
    const userExists = await this.usersRepository.findById(data.userId)

    if (!userExists) {
      throw new ResourceNotFoundError()
    }

    return {
      user: userExists
    }

  }
}