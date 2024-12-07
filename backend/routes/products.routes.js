import {Router} from 'express'
import { createProducts, deleteProducts, getOneProduct, getProducts, updateProducts } from '../controllers/products.controllers.js'


const router = Router()

// Devuelve TODOS los productos
router.get('/products', getProducts) 

// Crear producto.
router.post('/products', createProducts)

// Actualizar producto.
router.put('/products/:id', updateProducts)

// Eliminar producto.
router.delete('/products/:id', deleteProducts)

// Devuelve UN producto.
router.get('/products/:id', getOneProduct)

export default router