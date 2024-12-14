import express, { NextFunction, Request, Response, Express } from 'express'
import * as http from 'http'
import { Server, Socket } from 'socket.io'
import userRouter from './route/user.route'
import loginRouter from './route/login.route'
import { tryCatch, verifyToken } from './utils'
import SocketController from './controller/socket.controller'
import SocketChat from './model/socket-chat.model'
import SocketService from './service/socket.service'

declare module 'express-serve-static-core' {
  interface Request {
    myProp?: boolean
  }
}

export default class App {
  private readonly _app: Express
  private readonly _httpServer: http.Server
  private readonly _io: Server

  constructor() {
    this._app = express()

    this._httpServer = http.createServer(this._app)

    this._io = new Server(this._httpServer, {})

    this.middleware()
    this.socket()
    this.routes()
  }

  middleware(): void {
    this._app.use(express.json())
    this._app.use(
      express.urlencoded({
        extended: true,
      }),
    )
    this._app.use(express.static('public'))
  }

  socket(): void {
    const socketModel = new SocketChat()
    const socketService = new SocketService(socketModel)

    this._io.on('connection', async (socket: Socket) =>
      new SocketController(socketService, this._io).socket(socket),
    )
  }

  routes(): void {
    this._app.use('/auth', loginRouter)
    this._app.use(tryCatch(verifyToken))
    this._app.use('/user', userRouter)
    this._app.use(this.errorHandler)
  }

  errorHandler(
    err: Error,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): void {
    let error = 'Internal Error'
    if (err instanceof Error) {
      error = err.message
    }

    res.json({ error })
  }

  listen(port: number): void {
    this._httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  }
}
