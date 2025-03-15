import { Router } from 'express'
import { getUsers, getUserGroups } from '../controllers/user.controller.ts'
import { loging, register, logout } from '../controllers/auth.controller.ts'
import { validate } from '../middlewares/validate.ts'
import { createUserSchema } from '../schemas/user.schema.ts'
import { authenticate } from '../middlewares/auth.middleware.ts'
const router = Router()

// Obtener todos los usuarios
router.get('/', authenticate, getUsers)
// todos los grupos de un usuario
router.get('/groups/:id', authenticate, getUserGroups)
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
