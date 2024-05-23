import { IOrder } from './order.interface'
import { OrderModel } from './order.model'

// add order to DB
const addOrderIntoDB = async (product: IOrder) => {
    const result = await OrderModel.create(product)
    return result
}

// fetch orders from DB
const fetchOrdersFromDB = async (query: object) => {
    const result = await OrderModel.find(query)
    return result
}

export const OrderService = {
    addOrderIntoDB,
    fetchOrdersFromDB,
}
