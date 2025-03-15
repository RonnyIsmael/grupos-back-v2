import { Router } from 'express';
import { loging, register, logout, session } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { createUserSchema } from '../schemas/user.schema.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();
router.post('/login', loging); // TODO validacioes para login
router.post('/register', validate(createUserSchema), register);
router.post('/logout', logout);
router.get('/session', authenticate, session);
export default router;
