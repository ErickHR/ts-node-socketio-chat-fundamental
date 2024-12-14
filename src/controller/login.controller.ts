import { Request, Response } from 'express'
import LoginService from '../service/login.service'
import { compareHash, generateJWT } from '../utils'
import { IAuthRequest } from '../utils/jwt'

export default class LoginController {
  constructor(private readonly loginService: LoginService) {}

  login = async (req: Request, res: Response): Promise<void> => {
    // const data = {
    //   email: req.body.email,
    //   password: req.body.password,
    // }

    const response = await this.loginService.getByEmail(req.body.email)
    if (!response) throw new Error('El usuario no existe')

    const { password, _id: uuid } = response

    const isPasswordValid = compareHash(req.body.password, password)
    if (!isPasswordValid) throw new Error('La contraseña no es válida')

    const token = generateJWT(uuid || '')

    res.json({
      token,
      response,
    })
  }

  renovateToken = async (req: IAuthRequest, res: Response): Promise<void> => {
    const token = generateJWT(req.user?._id || '')

    res.json({ user: req.user, token })
  }
}
