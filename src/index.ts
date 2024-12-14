import ENVIROMENT from './config/enviroment'
import App from './app'
import connectDB from './config/database'

connectDB(async () => {
  const app = new App()
  app.listen(ENVIROMENT.PORT)
})
