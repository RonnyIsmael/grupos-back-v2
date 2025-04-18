import { Router } from 'express';
import { getUsers, getUserGroups, getUserFriends } from '../controllers/user.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();
// Obtener todos los usuarios
router.get('/', authenticate, getUsers);
// todos los grupos de un usuario
router.get('/groups/:id', authenticate, getUserGroups);
router.get('/friends/:id', authenticate, getUserFriends);
/*
// Obtener un usuario por ID
router.get('/:id', getUserById)

// Crear un nuevo usuario
router.post('/', createUser)

// Actualizar un usuario existente
router.put('/:id', updateUser)

// Eliminar un usuario
router.delete('/:id', deleteUser)
*/
export default router;
