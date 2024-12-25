import UserDataSource from '../infraestructure/local.datasource.impl'

export default class UserController {
  constructor(private readonly userDataSource: UserDataSource) {}
}
