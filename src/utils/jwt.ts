import jwt from 'jsonwebtoken'
import ENVIROMENT from '../config/enviroment'
import { NextFunction, Request, Response } from 'express'
import UserService from '../service/user.service'
import User from '../model/user.model'
import IUser from '../model/interface/user.model'

const user = new User()
const loginService = new UserService(user)

export interface IAuthRequest extends Request {
  user?: IUser
}

const verifyToken = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const { authorization } = req.headers

  if (!authorization) throw new Error('Token is required')

  const { uuid } = (await verifyJWT(authorization.split(' ')[1])) as {
    uuid: string
  }

  const response = await loginService.getById(uuid)
  if (!response) throw new Error('El usuario no existe')

  if (!response.status) throw new Error('El usuario no está activo')

  req.user = response
  next()
}

const generateJWT = (uuid: string) => {
  return jwt.sign({ uuid }, ENVIROMENT.JWT.SECRET, {
    expiresIn: '1h',
  })
}

const verifyJWT = async (token: string) => {
  return jwt.verify(token, ENVIROMENT.JWT.SECRET)
}

const verifyTokenSocket = async (token: string) => {
  try {
    const { uuid } = (await verifyJWT(token.split(' ')[1])) as { uuid: string }

    const response = await loginService.getById(uuid)

    if (!response) return null

    if (!response.status) return null

    return response
  } catch (error) {
    if (error instanceof Error) console.log(error.message)
    return null
  }
}

export { generateJWT, verifyJWT, verifyToken, verifyTokenSocket }
