import { connect } from 'mongoose'
import ENVIROMENT from './enviroment'

const connectDB = async (func: () => Promise<void>) => {
  try {
    await connect(ENVIROMENT.MONGOOSEE)
    console.log('Connected to database')
    await func()
  } catch (error) {
    console.log(error)
  }
}

export default connectDB
