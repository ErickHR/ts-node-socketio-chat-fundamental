import { Server, Socket } from 'socket.io'
import AddUserUseCase from '../../user/domain/usecase/add.usercase'
import UserRepositoryImpl from '../../user/infraestructure/user.repository.impl'
import UserDataSource from '../../user/infraestructure/local.datasource.impl'
import User from '../../user/domain/entity/user.entity'
import GetAllUseCase from '../../user/domain/usecase/getAll.usecase'
import DeleteUserUseCase from '../../user/domain/usecase/delete.usecase'
import GetByIdUserUseCase from '../../user/domain/usecase/getById.usecase'
import GetAllConnectByRoomUseCase from '../../user/domain/usecase/getAllConnectByRoom.usercase'

const userDataSource = new UserDataSource()
const userRepository = new UserRepositoryImpl(userDataSource)

const addUserUserCase = new AddUserUseCase(userRepository)
const getAllUserUseCase = new GetAllUseCase(userRepository)
const deleteUserUseCase = new DeleteUserUseCase(userRepository)
const getByIdUserUseCase = new GetByIdUserUseCase(userRepository)
const getAllConnectByRoomUseCase = new GetAllConnectByRoomUseCase(
  userRepository,
)

function createMsg(user: User, message: string) {
  return {
    user: user.name,
    message,
    date: new Date(),
  }
}

export default class AppSocket {
  constructor(private _io: Server) {}

  public static init(server: Server): AppSocket {
    return new AppSocket(server)
  }

  public start() {
    this._io.on('connection', (socket: Socket) => {
      console.log('a user connected')

      socket.on('userConnected', async (payload, callback) => {
        if (!payload.name || !payload.room) {
          return callback('El nombre y room son necesario')
        }

        const user: User = new User(socket.id, payload.name, payload.room)
        await addUserUserCase.execute(user)

        socket.join(payload.room)

        const userConnected = await getAllConnectByRoomUseCase.execute(
          payload.room,
        )
        socket.broadcast
          .to(payload.room)
          .emit(
            'list-user',
            await getAllConnectByRoomUseCase.execute(payload.room),
          )

        callback(userConnected)
      })

      socket.on('disconnect', async () => {
        const userDelete = await deleteUserUseCase.execute(socket.id)

        const payload = {
          user: 'ADMIN',
          message: `${userDelete.name} left the chat`,
        }

        socket.broadcast.to(userDelete.room).emit('left-user', payload)
        socket.broadcast
          .to(userDelete.room)
          .emit(
            'list-user',
            await getAllConnectByRoomUseCase.execute(userDelete.room),
          )
      })

      socket.on('message-private', async (payload) => {
        const user: User = await getByIdUserUseCase.execute(socket.id)

        socket.broadcast
          .to(payload.to)
          .emit('message-private', createMsg(user, payload.message))
      })

      socket.on('message-public', async (payload) => {
        const user: User = await getByIdUserUseCase.execute(socket.id)

        socket.broadcast.emit(
          'message-public',
          createMsg(user, payload.message),
        )
      })
    })
  }
}
