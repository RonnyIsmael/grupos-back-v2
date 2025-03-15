import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET || 'super_secret_key'; // Usa una clave fuerte en producción
export const generateToken = (userId) => {
    return jwt.sign({ userId }, SECRET_KEY, { expiresIn: '1h' }); // Token válido por 1 hora
};
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, SECRET_KEY);
    }
    catch (error) {
        return null;
    }
};
