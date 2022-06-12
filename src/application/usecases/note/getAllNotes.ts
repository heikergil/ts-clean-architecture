import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRespository'

export class GetAllUsersUseCase {
  private readonly _userRespository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
  }

  async run(): Promise<User[]> {
    return await this._userRespository.getAll()
  }
}
