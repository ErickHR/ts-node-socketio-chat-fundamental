import IUser from '../model/interface/user.model'
import User from '../model/user.model'

export default class UserService {
  constructor(private readonly user: User) {}

  async create(data: IUser): Promise<IUser> {
    return await this.user.save(data)
  }

  async getById(id: string): Promise<IUser | null> {
    return await this.user.findById(id)
  }

  async getAll(): Promise<IUser[]> {
    return await this.user.findAll()
  }
}
