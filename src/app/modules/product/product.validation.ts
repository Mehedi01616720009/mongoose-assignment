import { z } from 'zod'

// Define the Zod schema for IVariant
const variantValidationSchema = z.object({
    type: z.string().min(1, { message: 'Variant type cannot be empty' }),
    value: z.string().min(1, { message: 'Variant value cannot be empty' }),
})

// Define the Zod schema for IInventory
const inventoryValidationSchema = z.object({
    quantity: z
        .number()
        .int({ message: 'Quantity must be an integer' })
        .nonnegative({ message: 'Quantity must be non-negative' }),
    inStock: z.boolean({ message: 'InStock must be a boolean' }),
})

// Define the Zod schema for IProduct
const productValidationSchema = z.object({
    name: z.string().min(1, { message: 'Product name cannot be empty' }),
    description: z
        .string()
        .min(1, { message: 'Product description cannot be empty' }),
    price: z
        .number()
        .nonnegative({ message: 'Price must be a non-negative number' }),
    category: z.string().min(1, { message: 'Category cannot be empty' }),
    tags: z.array(z.string().min(1, { message: 'Tag cannot be empty' }), {
        message: 'Tags must be an array of non-empty strings',
    }),
    variants: z.array(variantValidationSchema, {
        message: 'Variants must be an array of variant objects',
    }),
    inventory: inventoryValidationSchema,
})

export default productValidationSchema
