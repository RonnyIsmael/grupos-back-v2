import pkg from 'pg'
const { Pool } = pkg

const prodPool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

const localPool = new Pool({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1234',
  database: 'tt_party'
})
const pool = process.env.NODE_ENV === 'PROD' ? prodPool : localPool;

export const connectDB = async () => {
  try {
    await pool.connect()
    console.log('✅ Conectado a PostgreSQL')
  } catch (error) {
    console.error('❌ Error conectando a PostgreSQL:', error)
    process.exit(1)
  }
}

export default pool
