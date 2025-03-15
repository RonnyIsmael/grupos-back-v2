import { ZodError } from 'zod';
import { AppError } from '../utils/AppError.js';
export const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.status || 500;
    if (err instanceof ZodError) {
        console.log('zod error');
        const errors = err.errors.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
        }));
        res.status(400).json({
            success: false,
            errors,
        });
    }
    else if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }
    else {
        console.log('error');
        res.status(statusCode).json({
            success: false,
            message: err.message || 'Ocurrió un error inesperado.',
        });
    }
};
