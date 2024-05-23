import { Request, Response } from 'express'
import { ProductService } from './product.service'
import { IProduct } from './product.interface'
import productValidationSchema from './product.validation'

// add product
const addProduct = async (req: Request, res: Response) => {
    try {
        const product = req.body

        // validate data
        const validateData = productValidationSchema.parse(product)

        // query for add product to DB
        const result = await ProductService.addProductsIntoDB(validateData)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Product Added Successfully',
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

// fetch product
const fetchProducts = async (req: Request, res: Response) => {
    try {
        const { searchTerm } = req.query

        let query = {}

        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                ],
            }
        }

        // query for add product to DB
        const result = await ProductService.fetchProductsFromDB(query)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Product Retrieved Successfully',
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

// fetch product by id
const fetchProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // query for add product to DB
        const result = await ProductService.fetchProductByIdFromDB(id)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Product Retrieved Successfully',
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

// update product
const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product: IProduct = req.body

        // query for add product to DB
        await ProductService.updateProductIntoDB(id, product)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Product Updated Successfully',
            data: product,
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

// delete product
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        // query for add product to DB
        await ProductService.deleteProductFromDB(id)

        // send response success
        res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully',
            data: null,
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

export const ProductController = {
    addProduct,
    fetchProducts,
    fetchProductById,
    updateProduct,
    deleteProduct,
}
