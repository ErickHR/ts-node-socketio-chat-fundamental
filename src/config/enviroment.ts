import dotenv from 'dotenv'

dotenv.config()

const ENVIROMENT = {
  PORT: Number(process.env.PORT),
  MONGOOSEE: String(process.env.MONGOOSEE_URL),
  JWT: {
    SECRET: String(process.env.JWT_SECRET),
  },
}

export default ENVIROMENT
