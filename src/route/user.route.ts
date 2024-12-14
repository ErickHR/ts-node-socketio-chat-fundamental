import { Router } from 'express'
import { tryCatch } from '../utils'
import UserController from '../controller/user.controller'
import UserService from '../service/user.service'
import User from '../model/user.model'

const user = new User()
const userService = new UserService(user)

const userController = new UserController(userService)

const router: Router = Router()

router.post('/', tryCatch(userController.create))
router.get('/', tryCatch(userController.getAll))

export default router
