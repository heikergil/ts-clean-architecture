import { User } from '../../../domain/entities/User'
import { UserRepository } from '../../../domain/repositories/UserRespository'
import { UserExistByNameService } from '../../../domain/services/userExistByNameService'

export class CreateNewUserUseCase {
  private readonly _userRespository: UserRepository
  private readonly _userExist: UserExistByNameService

  constructor(userRepository: UserRepository) {
    this._userRespository = userRepository
    this._userExist = new UserExistByNameService(userRepository)
  }

  async run(body: User): Promise<User | null> {
    const existUser: boolean = await this._userExist.run(body.username)

    if (existUser) {
      console.log('User already exist')
      return null
    } else {
      const userCreated: User = await this._userRespository.save(body)

      return userCreated
    }
  }
}
