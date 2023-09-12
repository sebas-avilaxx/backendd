import { Router } from "express";
import {getProductByIdController, getProductsController, postNewProductController, updateNewProductController, deleteProductController} from '../controllers/product.controller.js'

const router = Router()

router.get('/', getProductsController)

router.get('/:id', getProductByIdController)

router.post('/', postNewProductController)

router.put('/:id', updateNewProductController)

router.delete('/:id', deleteProductController)

export default router