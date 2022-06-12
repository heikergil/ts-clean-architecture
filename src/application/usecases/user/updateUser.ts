import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRespository'
import { UserExistByIdService } from '../../../domain/services/userExistById'

export class UpdateUserUseCase {
  private readonly _userRespository: UserRepository
  private readonly _userExist: UserExistByIdService

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
    this._userExist = new UserExistByIdService(userRepository)
  }

  async run(body: User): Promise<User | null> {
    const existUser: boolean = await this._userExist.run(body.id)

    if (existUser) {
      console.log('user exist')
      const userCreated: User = await this._userRespository.update(body)

      return userCreated
    } else {
      console.log('User does not exist')
      return null
    }
  }
}
