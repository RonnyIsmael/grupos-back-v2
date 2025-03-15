import { Router } from 'express'
import { authenticate } from '../middlewares/auth.middleware.ts'
import { getUsersGroup } from '../controllers/group.controller.ts'
const router = Router()

// cantidad de usuarios de un grupo
router.get('/count/users/:id', authenticate, getUsersGroup)

export default router
