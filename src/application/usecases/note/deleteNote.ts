// import { User } from '../../../domain/entities/User'
import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRespository'

export class DeleteUserUseCase {
  private readonly _userRespository: UserRepository

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
  }

  async run(user: User): Promise<void> {
    await this._userRespository.delete(user)
  }
}
