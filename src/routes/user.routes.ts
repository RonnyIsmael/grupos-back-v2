import { Router } from 'express'
import { getUsers, getUserGroups, getUserFriends } from '../controllers/user.controller.js'
import { loging, register, logout } from '../controllers/auth.controller.js'
import { validate } from '../middlewares/validate.js'
import { createUserSchema } from '../schemas/user.schema.js'
import { authenticate } from '../middlewares/auth.middleware.js'
const router = Router()

// Obtener todos los usuarios
router.get('/', authenticate, getUsers)
// todos los grupos de un usuario
router.get('/groups/:id', authenticate, getUserGroups)
router.get('/friends/:id', authenticate, getUserFriends)
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
export default router
