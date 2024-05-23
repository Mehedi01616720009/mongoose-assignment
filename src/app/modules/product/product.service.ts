import { IProduct } from './product.interface'
import { Product } from './product.model'

// add product to DB
const addProductsIntoDB = async (product: IProduct) => {
    const result = await Product.create(product)
    return result
}

// fetch products from DB
const fetchProductsFromDB = async (query: object) => {
    const result = await Product.find(query)
    return result
}

// fetch product by id from DB
const fetchProductByIdFromDB = async (id: string) => {
    const result = await Product.findById(id)
    return result
}

// update product into DB
const updateProductIntoDB = async (id: string, product: IProduct) => {
    const result = await Product.updateOne({ _id: id }, product)
    return result
}

// delete product from DB
const deleteProductFromDB = async (id: string) => {
    const result = await Product.deleteOne({ _id: id })
    return result
}

export const ProductService = {
    addProductsIntoDB,
    fetchProductsFromDB,
    fetchProductByIdFromDB,
    updateProductIntoDB,
    deleteProductFromDB,
}
