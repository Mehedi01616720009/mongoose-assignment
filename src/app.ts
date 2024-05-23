import express, { Application } from 'express'
import cors from 'cors'
import { ProductRoute } from './app/modules/product/product.route'
const app: Application = express()

app.use(express.json())
app.use(cors())

// product route
app.use('/api/products', ProductRoute)

export default app
