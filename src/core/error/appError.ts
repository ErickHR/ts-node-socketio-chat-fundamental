import { HTTP_CODE } from '../const/httpCode'

export default class AppError extends Error {
  constructor(
    private _statusCode: number,
    private _name: string,
    private _message: string,
    private _isOperational: boolean,
  ) {
    super(_message)
    Error.captureStackTrace(this, this.constructor)
  }

  public static notFound(message: string) {
    return new AppError(HTTP_CODE.NOT_FOUND, 'Not Found', message, true)
  }

  public static badRequest(message: string) {
    return new AppError(HTTP_CODE.BAD_REQUEST, 'Bad Request', message, true)
  }
}
