import User from '../entity/user.entity'
import UserRepository from '../repository/user.repository'

export default class GetAllConnectByRoomUseCase {
  constructor(private readonly userRepository: UserRepository) {}
  execute(room: string): Promise<User[]> {
    return this.userRepository.getAllConnectByRoom(room)
  }
}
