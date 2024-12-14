import { Server, Socket } from 'socket.io'
import { verifyTokenSocket } from '../utils/jwt'
import SocketService from '../service/socket.service'
import IUser from '../model/interface/user.model'

export default class SocketController {
  constructor(
    private readonly _socketService: SocketService,
    private _io: Server,
  ) {}

  async socket(socket: Socket) {
    const usuario: IUser | null = await verifyTokenSocket(
      socket.handshake.headers.authorization || '',
    )

    if (!usuario) {
      socket.disconnect()
    } else {
      console.log('a user connected')

      socket.join(usuario._id?.toString() || '')

      // USER_CONNECT.push(usuario)
      await this._socketService.connectUser(usuario._id as string)

      // socket.broadcast.emit('list-user', USER_CONNECT)
      // socket.emit('list-user', USER_CONNECT)
      const usersConnect = await this._socketService.listUserConnect()
      this._io.emit('list-user', usersConnect)

      socket.on('message-send', async (payload) => {
        console.log(payload.users)
        socket.to(payload.users[1]).emit('message-private', 'Enviando privado')

        // await this._socketService.saveMsg(payload)
        // this._io.emit(
        //   'message-receive',
        //   await this._socketService.getTopTenMsg(payload.users),
        // )
      })

      socket.on('disconnect', async () => {
        console.log('user disconnected')

        // console.log(USER_CONNECT)
        // USER_CONNECT = USER_CONNECT.filter(
        //   (user) => user.email !== usuario?.email,
        // )

        await this._socketService.disconnectUser(usuario._id as string)

        // socket.broadcast.emit('list-user', USER_CONNECT)
        // socket.emit('list-user', USER_CONNECT)
        const usersConnect = await this._socketService.listUserConnect()

        this._io.emit('list-user', usersConnect)
      })
    }

    // socket.emit('message', 'Hello World')
  }
}
