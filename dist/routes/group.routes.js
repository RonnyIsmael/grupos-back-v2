import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { getUsersGroup, getGroupById, addGroup, addUsersToGroup } from '../controllers/group.controller.js';
const router = Router();
router.get('/count/users/:id', authenticate, getUsersGroup);
router.get('/:id', authenticate, getGroupById);
router.post('/add', authenticate, addGroup);
router.post('/add/users', authenticate, addUsersToGroup);
export default router;
