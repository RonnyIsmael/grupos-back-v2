import app from './app.ts'
import { connectDB } from './config/db.config.ts'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000 // TODO const

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
