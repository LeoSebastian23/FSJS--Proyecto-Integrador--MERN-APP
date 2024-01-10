// Configuracion de Express
import express from 'express'
import fileUpload from 'express-fileupload'
import productsRoutes from './routes/products.routes.js'
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))


// routes
app.use(productsRoutes)
// console.log(__dirname) 
app.use(express.static(path.join(__dirname, '../client01/build')));

export default app
