import express from 'express'
import { ProductController } from './product.controller'

const router = express.Router()

// product add route
router.post('/', ProductController.addProduct)

// product fetch route
router.get('/', ProductController.fetchProducts)

// product fetch route
router.get('/:id', ProductController.fetchProductById)

// product update route
router.put('/:id', ProductController.updateProduct)

// product delete route
router.delete('/:id', ProductController.deleteProduct)

export const ProductRoute = router
