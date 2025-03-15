import { Request, Response, NextFunction } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../utils/AppError.js'

interface CustomError extends Error {
  status?: number
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 500
  if (err instanceof ZodError) {
    console.log('zod error')
    const errors = err.errors.map((e) => ({
      field: e.path.join('.'),
      message: e.message,
    }))

    res.status(200).json({
      succes: false,
      errors,
    })

  } else if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    })
  } else {
    console.log(err.message)
    res.status(statusCode).json({
      success: false,
      message: err.message || 'Ocurrió un error inesperado.',
    })
  }

}
