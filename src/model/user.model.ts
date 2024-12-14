import IUser from './interface/user.model'
import UserSchema from './schema/user.schema'

export default class User {
  async findById(id: string): Promise<IUser | null> {
    return UserSchema.findById(id)
  }

  async findAll(): Promise<IUser[]> {
    return UserSchema.find({ status: true })
  }

  async update(id: string, data: IUser): Promise<IUser | null> {
    return UserSchema.findByIdAndUpdate(id, data, { new: true })
  }

  async save(data: IUser): Promise<IUser> {
    return UserSchema.create(data)
  }

  async delete(id: string): Promise<IUser | null> {
    return UserSchema.findByIdAndUpdate(id, { deleted: true }, { new: true })
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return UserSchema.findOne({ email: email })
  }
}
