import { Schema } from 'mongoose'

export default interface IMessage {
  users: Schema.Types.ObjectId[]
  message: [
    {
      text: string
      createdAt: Date
      updatedAt: Date
      deletedAt: Date
      deleted: boolean
      seen: boolean
      seenAt: Date
      property: Schema.Types.ObjectId
    },
  ]
}
