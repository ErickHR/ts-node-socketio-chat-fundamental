import IUserDataSource from '../domain/datasource/user.datasource'
import User from '../domain/entity/user.entity'

const USER_ENTITY: User[] = []

export default class UserDataSource implements IUserDataSource {
  async getAll(): Promise<User[]> {
    return USER_ENTITY
  }

  async getAllByRoom(room: string): Promise<User[]> {
    return USER_ENTITY.filter((user: User) => user.room === room)
  }

  async add(user: User): Promise<void> {
    USER_ENTITY.push(user)
  }

  async getById(id: string): Promise<User | undefined> {
    return USER_ENTITY.find((user: User) => user.id === id)
  }

  async delete(id: string): Promise<User> {
    const user = USER_ENTITY.find((user: User) => user.id === id)

    USER_ENTITY.splice(
      USER_ENTITY.findIndex((user: User) => user.id === id),
      1,
    )

    return user as User
  }
}
