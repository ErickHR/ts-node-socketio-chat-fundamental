import { NextFunction, Request, Response } from 'express'
import { body, check, validationResult } from 'express-validator'

const validatorIsEmail = (name: string, message = 'El email no es válido') => {
  return body(name, message).isEmail()
}

const validatorNotEmpty = (name: string, message = 'El campo es requerido') => {
  return check(name, message).not().isEmpty()
}

const validatorResult = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req)
  if (!result.isEmpty()) res.json({ errors: result.array() })
  else next()
}

export { validatorIsEmail, validatorResult, validatorNotEmpty }
