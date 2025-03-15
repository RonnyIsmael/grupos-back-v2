import { Router } from 'express'
import { loging, register, logout, session } from '../controllers/auth.controller.ts'
import { validate } from '../middlewares/validate.ts'
import { createUserSchema } from '../schemas/user.schema.ts'
import { authenticate } from '../middlewares/auth.middleware.ts'


const router = Router()

router.post('/login', loging)// TODO validacioes para login
router.post('/register', validate(createUserSchema), register)
router.post('/logout', logout)
router.get('/session', authenticate, session)


export default router
