import {productDb} from "../db/productDb";
import {ProductType} from "../routes/products";

export const productsRepository = {
    createNewProduct(title: string) {
        const newProduct = {id: productDb.length ? productDb[productDb.length - 1].id + 1 : 1, title } as ProductType

        productDb.push(newProduct)

        return newProduct
    }
}