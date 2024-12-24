import IMessage from '../model/interface/message.model'
import Message from '../model/message.model'

export default class MessageService {
  constructor(private readonly message: Message) {}

  async getTopTen(): Promise<IMessage[]> {
    return await this.message.getTopTen()
  }

  async save(data: IMessage): Promise<IMessage> {
    return await this.message.save(data)
  }
}
