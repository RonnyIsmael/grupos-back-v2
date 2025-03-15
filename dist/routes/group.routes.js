import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getUsersGroup } from '../controllers/group.controller.js';
const router = Router();
// cantidad de usuarios de un grupo
router.get('/count/users/:id', authenticate, getUsersGroup);
export default router;
