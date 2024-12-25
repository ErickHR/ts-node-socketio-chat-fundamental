import AppError from '../../../../core/error/appError'
import User from '../entity/user.entity'
import UserRepository from '../repository/user.repository'

export default class GetByIdUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.userRepository.getById(id)

    if (!user) throw AppError.notFound('User not found')

    return user
  }
}
