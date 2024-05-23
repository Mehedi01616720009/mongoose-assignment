import express, { Application, Request, Response } from 'express'
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

app.get('/', (req: Request, res: Response) => {
    res.send({ message: 'server is running' })
})

export default app
