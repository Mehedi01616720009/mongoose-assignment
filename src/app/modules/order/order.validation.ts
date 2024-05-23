import { z } from 'zod'

const orderValidationSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    productId: z.string().min(1, { message: 'Product ID cannot be empty' }),
    price: z
        .number()
        .nonnegative({ message: 'Price must be a non-negative number' }),
    quantity: z
        .number()
        .int({ message: 'Quantity must be an integer' })
        .positive({ message: 'Quantity must be a positive number' }),
})

export default orderValidationSchema
