import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../config/jwt.config.js'
import { AppError } from '../utils/AppError.js'

export interface AuthRequest extends Request {
    user?: { userId: number }
}

export const authenticate = (req: AuthRequest, _res: Response, next: NextFunction) => {
    const token = req.cookies.acces_token // Leer token de la cookie

    if (!token) {
        throw new AppError('Acceso denegado. No hay sesión activa.', 401)
    }

    const decoded = verifyToken(token)

    if (!decoded) {
        throw new AppError('Sesión inválida o expirada.', 401)
    }

    req.user = { userId: decoded.userId }
    next()
}
