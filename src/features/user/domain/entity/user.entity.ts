export default class User {
  constructor(
    private _id: string,
    private _name: string,
    private _room: string,
  ) {}

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }

  get room() {
    return this._room
  }
}
