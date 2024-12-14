import { Schema } from 'mongoose'
import IMessage from './interface/message.model'
import IUser from './interface/user.model'
import MessageSchema from './schema/message.schema'
import UserSchema from './schema/user.schema'

export default class SocketChat {
  // private _user_connect: Record<string, IUser> = {}

  private _message: IMessage[] = []

  async listUserConnect(): Promise<IUser[]> {
    return UserSchema.find({ isOnline: true })
    // return Object.values(this._user_connect)
  }

  async disconnectUser(id: string) {
    return UserSchema.findByIdAndUpdate(id, { isOnline: false }, { new: true })
    // delete this._user_connect[id]
  }

  async connectUser(id: string) {
    // if (user._id) this._user_connect[user._id] = user
    return UserSchema.findByIdAndUpdate(
      id,
      { isOnline: true, lastSeen: new Date() },
      { new: true },
    )
  }

  async findMsg(users: Schema.Types.ObjectId[]) {
    return MessageSchema.findOne({
      users: { $all: users },
      $expr: { $eq: [{ $size: '$users' }, users.length] },
    })
  }

  async saveMsg(data: IMessage): Promise<void> {
    await MessageSchema.create(data)
    // this._message.push(data)
  }

  async getTopTenMsg(users: Schema.Types.ObjectId[]) {
    // return this._message

    const msg = await MessageSchema.findOne(
      {
        users: { $all: users },
        $expr: { $eq: [{ $size: '$users' }, users.length] },
      },
      { message: { $slice: -10 } },
    ).populate('message.property', 'email')

    return msg
  }
}
