import User from '../entity/user.entity'

export default interface UserRepository {
  getAll(): Promise<User[]>
  add(user: User): Promise<void>
  getById(id: string): Promise<User | undefined>
  delete(id: string): Promise<User>
}
