import { User } from '../../../domain/entities/User'
import { CreateNewUserUseCase } from '../../../application/usecases/user/createNewUser'
import { DeleteUserUseCase } from '../../../application/usecases/user/deleteUser'
import { GetAllUsersUseCase } from '../../../application/usecases/user/getAllUsers'
import { InMemoryUserRepository } from '../../implementations/inMemory/inMemoryUserRepository'
import { UpdateUserUseCase } from '../../../application/usecases/user/updateUser'
;(async () => {
  const inMemoryUserRepo = new InMemoryUserRepository()
  const getUsers = new GetAllUsersUseCase(inMemoryUserRepo)
  console.log('Shoould print empty array: ', await getUsers.run())

  const createNewUserUseCase = new CreateNewUserUseCase(inMemoryUserRepo)
  const deleteUserById = new DeleteUserUseCase(inMemoryUserRepo)
  const updateUser = new UpdateUserUseCase(inMemoryUserRepo)

  const userToCreate: User = {
    name: 'Heiker',
    age: 36,
    username: 'heiker36',
    id: '123'
  }
  await createNewUserUseCase.run(userToCreate)
  console.log('should print new user: ', await getUsers.run()) // should print new user

  await createNewUserUseCase.run(userToCreate) // should print user already exist
  console.log('should print one user: ', await getUsers.run()) // should print one user

  await deleteUserById.run(userToCreate) // should delete new user
  console.log('should print empty array: ', await getUsers.run()) // should print empty

  await createNewUserUseCase.run(userToCreate)
  console.log('should print new user: ', await getUsers.run()) // should print new user

  const userToUpdate: User = {
    name: 'Jose',
    age: 40,
    username: 'jose36',
    id: '123'
  }
  await updateUser.run(userToUpdate)
  console.log('should print new user: ', await getUsers.run()) // should print update user
})()
