import 'dotenv/config'

export const ENVIROMENT_TEST = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  DB_URL: process.env.DB_URL,
}