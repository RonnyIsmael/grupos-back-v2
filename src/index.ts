import app from './app.js'
import { connectDB } from './config/db.config.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000 // TODO const

app.listen(PORT, async () => {
  await connectDB()
  console.log(`Servidor corriendo en puerto ${PORT}`)
})
