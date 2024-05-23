import { Schema, model, connect } from 'mongoose'
import {
    IInventory,
    IProduct,
    IVariant,
    ProductModel,
} from './product.interface'

// create product variant schema
const variantSchema = new Schema<IVariant>({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
})

// create product inventory schema
const inventorySchema = new Schema<IInventory>({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
})

// create product schema
const productSchema = new Schema<IProduct, ProductModel>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantSchema],
        required: true,
    },
    inventory: {
        type: inventorySchema,
        required: true,
    },
})

productSchema.statics.isProductExist = async (id: string, price: number) => {
    const isExist = await Product.findOne({ _id: id, price: price })
    return isExist
}

productSchema.statics.isProductAvailable = async (
    id: string,
    quantity: number,
) => {
    const isAvailable = await Product.findOne({
        _id: id,
        'inventory.quantity': { $gte: quantity },
        'inventory.inStock': true,
    })
    return isAvailable
}

productSchema.statics.decrementProductStock = async (
    id: string,
    quantity: number,
) => {
    const isUpdate = await Product.updateOne({ _id: id }, [
        {
            $set: {
                'inventory.quantity': {
                    $max: [{ $subtract: ['$inventory.quantity', quantity] }, 0],
                },
                'inventory.inStock': {
                    $gt: [{ $subtract: ['$inventory.quantity', quantity] }, 0],
                },
            },
        },
    ])
    return isUpdate
}

// create product model
export const Product = model<IProduct, ProductModel>('Product', productSchema)
