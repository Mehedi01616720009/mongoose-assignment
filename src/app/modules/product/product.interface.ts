import { Model } from 'mongoose'

// create product variant interface
export interface IVariant {
    type: string
    value: string
}

// create product inventory interface
export interface IInventory {
    quantity: number
    inStock: boolean
}

// create product interface
export interface IProduct {
    name: string
    description: string
    price: number
    category: string
    tags: string[]
    variants: IVariant[]
    inventory: IInventory
}

// create product model
export interface ProductModel extends Model<IProduct> {
    isProductExist(id: string, price: number): Promise<IProduct | null>
    isProductAvailable(id: string, quantity: number): Promise<IProduct | null>
    decrementProductStock(
        id: string,
        quantity: number,
    ): Promise<IProduct | null>
}
