// Configuracion de Express
import express from 'express'
import fileUpload from 'express-fileupload'
import productsRoutes from './routes/products.routes.js'


const app = express()

// middlewares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))


// routes
app.use(productsRoutes)

export default app
