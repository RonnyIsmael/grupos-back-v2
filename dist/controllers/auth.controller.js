import userModel from '../models/user.model.js';
import { compare } from "bcrypt-ts";
import { generateToken } from '../config/jwt.config.js';
export const loging = async (req, res, next) => {
    console.log('Start login');
    try {
        let response = {};
        const { email, password } = req.body;
        const user = await userModel.findByEmail(email);
        if (!user) {
            response = { status: 'KO', msg: 'Invalid user' };
            res.json(response);
            return;
        }
        const isValid = await compare(password, user.password);
        if (!isValid) {
            response = { status: 'KO', msg: 'Invalid password' };
            res.json(response);
            return;
        }
        console.log('OK login');
        const { password: _, ...userData } = user;
        response = { status: 'OK', body: userData };
        const token = generateToken(user.id);
        res
            .cookie('acces_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'PROD', // TODO cambiar true para produccion con una variable de entorno
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60,
        })
            .json(response);
    }
    catch (error) {
        console.log('KO login');
        console.log(error.message);
        next(error);
    }
    console.log('End login');
};
export const register = async (req, res, next) => {
    try {
        const newUser = await userModel.create(req.body);
        res.status(201).json(newUser);
    }
    catch (error) {
        next(error);
    }
};
export const logout = async (_req, res, next) => {
    try {
        const users = await userModel.findAll();
        res.json(users);
    }
    catch (error) {
        next(error);
    }
};
export const session = async (req, res, next) => {
    try {
        console.log('Inicio check session');
        let response = {};
        if (!req.user) {
            response = { status: 'KO', msg: 'There is no user session' };
            return;
        }
        const user = await userModel.findById(req.user.userId);
        if (!user) {
            response = { status: 'KO', msg: 'User not found.' };
            return;
        }
        const { password: _, ...userData } = user; // Excluir la contraseña
        response = { status: 'OK', body: userData };
        res.json(response);
    }
    catch (error) {
        next(error);
    }
    console.log('Fin check session');
};
