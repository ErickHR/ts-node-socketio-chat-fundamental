import { Request, Response } from 'express'
import IUser from '../model/interface/user.model'
import UserService from '../service/user.service'
import { generateHash } from '../utils'

export default class UserController {
  constructor(private readonly userService: UserService) {}

  create = async (req: Request, res: Response): Promise<void> => {
    const data: IUser = {
      email: req.body.email,
      password: generateHash(req.body.password),
    }

    const response = await this.userService.create(data)
    res.send(response)
  }

  getAll = async (req: Request, res: Response): Promise<void> => {
    const response = await this.userService.getAll()
    res.json(response)
  }
}
