export default class User {
  constructor(
    private _id: string,
    private _name: string,
  ) {}

  get id() {
    return this._id
  }

  get name() {
    return this._name
  }
}
