import User from '../entity/user.entity'

export default interface IUserDataSource {
  getAll(): Promise<User[]>

  getAllByRoom(room: string): Promise<User[]>

  add(user: User): Promise<void>

  getById(id: string): Promise<User | undefined>

  delete(id: string): Promise<User>
}
