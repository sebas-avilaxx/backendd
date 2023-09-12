import express, {response, request} from "express";
import { getProductByIdService, getProductsService, setNewProductService, updateProductService, deleteProductService } from "../services/product.service.js";

// {
//     "title": "book1", 
//     "description": "descrp1", 
//     "code": "52f1", 
//     "price": 322,
//     "stock": 14, 
//     "category": "drama", 
//     "thumbnail": "link drama"
// }

export const getProductsController = async (req=request, res=response) =>{
    try {
        const { limit=10, category='all', sort=0 } = req.query

        const data = await getProductsService(Number(limit), category, sort)

        return res.status(200).json(data)
    } catch (error) {
        return res.json({error})
    }
}

export const getProductByIdController = async (req=request, res=response)=>{
    try {
        const { id } = req.params

        const data = await getProductByIdService(id)

        return res.status(200).json(data)
    } catch (error) {
        return res.json({error})
    }
}

export const postNewProductController = async (req=request, res=response)=>{
    try {
        const { title, description, code, price, stock, category, thumbnail } = req.body

        const data = await setNewProductService(title, description, code, price, stock, category, thumbnail)

        return res.status(201).json(data)
    } catch (error) {
        return res.json({error})
    }
}

export const updateNewProductController = async (req=request, res=response)=>{
    try {
        const { id } = req.params
        const newData = req.body

        const data = await updateProductService(id, newData)

        return res.status(201).json(data)
    } catch (error) {
        return res.json({error})
    }
}

export const deleteProductController = async (req=request, res=response)=>{
    try {
        const { id } = req.params

        const data = await deleteProductService(id)

        return res.status(201).json(data)
    } catch (error) {
        return res.json({error})
    }
}