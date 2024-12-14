import { NextFunction, Request, Response } from 'express'

const tryCatch = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      await fn(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}

export { tryCatch }
