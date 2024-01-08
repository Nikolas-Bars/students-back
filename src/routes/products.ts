import express, {Request, Response} from 'express'
import {productsRepository} from "../repositories/product-repository";
import {body} from "express-validator";
import {inputValidationMiddleware} from "../middleware/input-validation-middleware";

export type ProductType = {
    id: number
    title: string
}

const titleValidationMiddleWare = body('title').isLength({min: 3, max: 20}).withMessage('title fuckswwww')

export const productsRouter =(productDB: ProductType[])=> {
    const productRouter = express.Router()

    productRouter.get('/', (req: Request, res: Response) => {
        res.json(productDB)
    })

    productRouter.post('/', titleValidationMiddleWare, inputValidationMiddleware, (req: Request, res: Response) => {

        const newProduct = productsRepository.createNewProduct(req.body.title)

        res.status(201).json(newProduct)
    })

    return productRouter
}

