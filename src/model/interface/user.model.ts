export default interface IUser {
  email: string
  password: string
  uuid?: string
  _id?: string
  status?: boolean
  isOnline?: boolean
  lastSeen?: Date
}
