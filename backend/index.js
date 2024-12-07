
import app from './app.js'
import { PORT } from './config/config.js'
import { connectDB } from './connection/db.js'

connectDB()
app.listen(PORT)
console.log('Server in running port',PORT) 