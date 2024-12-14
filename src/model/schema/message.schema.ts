import { model, Schema } from 'mongoose'
import IMessage from '../interface/message.model'

const messageSchema = new Schema(
  {
    text: { type: String, required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true },
    deletedAt: { type: Date },
    deleted: { type: Boolean, required: true },
    seen: { type: Boolean, required: true },
    seenAt: { type: Date },
    property: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { _id: true },
)

const schema = new Schema<IMessage>(
  {
    users: {
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
      ],
      validate: [
        {
          validator: function (value: Schema.Types.ObjectId[]) {
            return value.length > 1
          },
          message: 'El campo "users" debe contener al menos dos usuario.',
        },
      ],
    },
    message: [
      {
        type: messageSchema,
        required: true,
      },
    ],
  },
  { timestamps: true },
)

const MessageSchema = model('Message', schema)

export default MessageSchema
