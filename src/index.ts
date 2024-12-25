import App from './app'
import { ENVIROMENT } from './core/enviroment'
// import router from './routes'
;(async () => {
  const app = new App(ENVIROMENT.PORT)
  app.init()
  app.start()
})()
