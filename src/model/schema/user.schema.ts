import { model, Schema } from 'mongoose'
import IUser from '../interface/user.model'

const schema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
)

schema.methods.toJSON = function () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { __v, _id, password, ...object } = this.toObject()
  object.uuid = _id

  return object
}

const UserSchema = model<IUser>('User', schema)

export default UserSchema
