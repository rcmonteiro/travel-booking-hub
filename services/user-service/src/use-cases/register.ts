import { User } from "@/entities/user";
import { Password } from "@/entities/value-objects/password";
import type { UsersRepository } from "@/repositories/users-repository";
import { UserAlreadyExistsError } from "./_errors/user-already-exists-error";

interface IRegisterRequestDTO {
  name: string;
  email: string;
  password: string;
}

interface IRegisterResponseDTO {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(data: IRegisterRequestDTO): Promise<IRegisterResponseDTO> {
    
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await User.create({
      name: data.name,
      email: data.email,
      passwordHash: await Password.create(data.password)
    })
    await this.usersRepository.create(user)

    return {
      user
    }

  }
}