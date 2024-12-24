import IMessage from './interface/message.model'
import MessageSchema from './schema/message.schema'

export default class Message {
  save(data: IMessage): Promise<IMessage> {
    return MessageSchema.create(data)
  }

  getTopTen(): Promise<IMessage[]> {
    return MessageSchema.find()
    // return MessageSchema.find().limit(10).sort({ createdAt: -1 })
  }
}
