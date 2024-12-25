import User from '../entity/user.entity'
import UserRepository from '../repository/user.repository'

export default class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  execute(id: string): Promise<User> {
    return this.userRepository.delete(id)
  }
}
