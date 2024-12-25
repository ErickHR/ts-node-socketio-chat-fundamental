import UserDataSource from '../domain/datasource/user.datasource'
import User from '../domain/entity/user.entity'
import UserRepository from '../domain/repository/user.repository'

export default class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  getAll(): Promise<User[]> {
    return this.userDataSource.getAll()
  }

  getAllConnectByRoom(room: string): Promise<User[]> {
    return this.userDataSource.getAllByRoom(room)
  }

  add(user: User): Promise<void> {
    return this.userDataSource.add(user)
  }

  getById(id: string): Promise<User | undefined> {
    return this.userDataSource.getById(id)
  }

  delete(id: string): Promise<User> {
    return this.userDataSource.delete(id)
  }
}
