import express from 'express'
import { OrderController } from './order.controller'

const router = express.Router()

// product add route
router.post('/', OrderController.addOrder)

// product fetch route
router.get('/', OrderController.fetchOrders)

export const OrderRoute = router
