import User from '../entity/user.entity'
import UserRepository from '../repository/user.repository'

export default class AddUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(user: User) {
    return this.userRepository.add(user)
  }
}
