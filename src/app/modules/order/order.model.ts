import { Schema, model, connect } from 'mongoose'
import { IOrder } from './order.interface'
import { Product } from '../product/product.model'

// create order schema
const orderSchema = new Schema<IOrder>({
    email: {
        type: String,
        required: true,
    },
    productId: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
})

// order create post hook
orderSchema.pre('save', async function (next) {
    try {
        const isExist = await Product.isProductExist(this.productId, this.price)
        if (!isExist) {
            throw new Error('Product does not exist with the specified price')
        }

        const isAvailable = await Product.isProductAvailable(
            this.productId,
            this.quantity,
        )
        if (!isAvailable) {
            throw new Error('Insufficient Stock')
        }

        await Product.decrementProductStock(this.productId, this.quantity)
        next()
    } catch (err: any) {
        next(err)
    }
})

// create order model
export const OrderModel = model<IOrder>('Order', orderSchema)
