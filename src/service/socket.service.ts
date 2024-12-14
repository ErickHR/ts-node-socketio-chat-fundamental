import { Schema } from 'mongoose'
import IMessage from '../model/interface/message.model'
import SocketChat from '../model/socket-chat.model'

export default class SocketService {
  constructor(private readonly socket: SocketChat) {}

  async disconnectUser(id: string) {
    await this.socket.disconnectUser(id)
  }

  async connectUser(id: string) {
    return await this.socket.connectUser(id)
  }

  async listUserConnect() {
    return await this.socket.listUserConnect()
  }

  async saveMsg(data: IMessage) {
    const msg = await this.socket.findMsg(data.users)
    if (msg) {
      msg.message.push(data.message[0])
      await msg.save()
    } else {
      await this.socket.saveMsg(data)
    }
  }

  async getTopTenMsg(users: Schema.Types.ObjectId[]) {
    return await this.socket.getTopTenMsg(users)
  }
}
