import Express from 'express'
import http from 'http'
import AppSocket from './features/socket/presentation/app'
import { Server } from 'socket.io'

export default class App {
  private _app = Express()

  private httpServer = http.createServer(this._app)

  constructor(
    private _port: number,
    // private _router: Router,
  ) {}

  public init() {
    this._app.use(Express.json())
    this._app.use(Express.urlencoded({ extended: true }))
    this._app.use(Express.static('public'))

    AppSocket.init(new Server(this.httpServer)).start()
  }

  public start() {
    this.httpServer.listen(this._port, () => {
      console.log(`Server running on port ${this._port}`)
    })
  }
}
