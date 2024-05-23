import { Request, Response } from 'express'
import { OrderService } from './order.service'
import orderValidationSchema from './order.validation'

// add order
const addOrder = async (req: Request, res: Response) => {
    try {
        const order = req.body

        // validate data
        const validateData = orderValidationSchema.parse(order)

        // query for add product to DB
        const result = await OrderService.addOrderIntoDB(validateData)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Order Created Successfully',
            data: result,
        })
    } catch (err: any) {
        // send response failed
        res.status(500).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            data: null,
        })
    }
}

// fetch orders
const fetchOrders = async (req: Request, res: Response) => {
    try {
        const { email } = req.query

        let query = {}

        if (email) {
            query = {
                email: email,
            }
        }

        // query for add product to DB
        const result = await OrderService.fetchOrdersFromDB(query)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Orders Retrieved Successfully',
            data: result,
        })
    } catch (err: any) {
        // send response failed
        res.status(500).json({
            success: false,
            message: err.message || 'Something Went Wrong',
            data: null,
        })
    }
}

export const OrderController = {
    addOrder,
    fetchOrders,
}
