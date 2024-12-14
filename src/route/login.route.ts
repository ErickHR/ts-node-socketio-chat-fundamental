import { Router } from 'express'
import {
  validatorIsEmail,
  tryCatch,
  validatorResult,
  validatorNotEmpty,
  verifyToken,
} from '../utils'
import User from '../model/user.model'
import LoginService from '../service/login.service'
import LoginController from '../controller/login.controller'

const user = new User()
const loginService = new LoginService(user)
const loginController = new LoginController(loginService)

const router = Router()

router.post(
  '/',
  validatorIsEmail('email'),
  validatorNotEmpty('password'),
  validatorResult,
  tryCatch(loginController.login),
)

router.get(
  '/renovate',
  tryCatch(verifyToken),
  tryCatch(loginController.renovateToken),
)

export default router
