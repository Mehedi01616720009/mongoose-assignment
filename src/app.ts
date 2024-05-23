import express, { Application } from 'express'
import cors from 'cors'
import { ProductRoute } from './app/modules/product/product.route'
import { OrderRoute } from './app/modules/order/order.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

// product route
app.use('/api/products', ProductRoute)

// order route
app.use('/api/orders', OrderRoute)

export default app
