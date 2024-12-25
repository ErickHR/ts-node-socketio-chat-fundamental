import UserRepository from '../repository/user.repository'

export default class GetAllUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute() {
    return await this.userRepository.getAll()
  }
}
