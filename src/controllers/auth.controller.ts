import { Request, Response, NextFunction } from 'express'
import userModel from '../models/user.model.js'
import { LoginUser, User } from '../interfaces/user.interface.js'
import { ResponseService } from '../interfaces/response.interface.js'
import { compare } from "bcrypt-ts"
import { generateToken } from '../config/jwt.config.js'
import { AuthRequest } from '../middlewares/auth.middleware.js'


export const loging = async (req: Request, res: Response, next: NextFunction) => {
    console.log('Start login')
    try {
        let response: ResponseService = {};
        const { email, password }: LoginUser = req.body;
        const user = await userModel.findByEmail(email)
        if (!user) {
            response = { succes: false, msg: 'Invalid user' }
            res.json(response)
            return
        }
        const isValid = await compare(password, user.password)
        if (!isValid) {
            response = { succes: false, msg: 'Invalid password' }
            res.json(response)
            return
        }
        console.log('OK login')
        const { password: _, ...userData }: User = user
        response = { succes: true, body: userData }
        const token = generateToken(user.id);
        console.log(user)

        res
            .cookie('acces_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'PROD', // TODO cambiar true para produccion con una variable de entorno
                sameSite: 'strict',
                maxAge: 1000 * 60 * 60,
            })
            .json(response)
    } catch (error: any) {
        console.log('KO login')
        console.log(error.message)
        next(error)
    }
    console.log('End login')

}
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let response: ResponseService = {};
        const newUser = await userModel.create(req.body)
        const { password: _, ...userData }: User = newUser
        response = { succes: true, body: userData }
        const token = generateToken(newUser.id);
        res.status(201).cookie('acces_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PROD', // TODO cambiar true para produccion con una variable de entorno
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60,
        }).json(response)
    } catch (error) {
        next(error)
    }

}

export const logout = async (_req: Request, res: Response, next: NextFunction) => {
    console.log('Deleting session...')
    res.clearCookie('acces_token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'PROD',
        sameSite: 'strict',
    })

    res.json({ success: true, message: 'Session closed.' })
    console.log('Session killed')
}
export const session = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        console.log('Inicio check session')
        let response: ResponseService = {};

        if (!req.user) {
            response = { succes: false, msg: 'There is no user session' }
            return
        }

        const user = await userModel.findById(req.user.userId)
        if (!user) {
            response = { succes: false, msg: 'User not found.' }
            return
        }

        const { password: _, ...userData } = user // Excluir la contraseña
        response = { succes: true, body: userData }
        res.json(response)
    } catch (error) {
        next(error)
    }
    console.log('Fin check session')
}