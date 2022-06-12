import { UserRepository } from 'domain/repositories/UserRespository'

export class UserExistByNameService {
  private readonly _userResposiory: UserRepository

  constructor(userRepository: UserRepository) {
    this._userResposiory = userRepository
  }

  async run(id: string): Promise<boolean> {
    const user = await this._userResposiory.getByUserName(id)

    if (user !== null) return true

    return false
  }
}
