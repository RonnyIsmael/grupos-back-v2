import express from 'express'
import cors from 'cors'
import userRoutes from './routes/user.routes.ts'
import authRoutes from './routes/auth.routes.ts'
import { errorHandler } from './middlewares/errorHandler.ts'
import cookieParser from 'cookie-parser'
import groupRoutes from './routes/group.routes.ts'

const app = express()

// Middlewares
app.disable('x-powered-by')
app.use(express.json())
app.use(cors({
    credentials: true
}))
app.use(cookieParser())

// Routes
app.use('/api/users', userRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/auth', authRoutes)

// Manejo global de errores
app.use(errorHandler)

export default app
