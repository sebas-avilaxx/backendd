import Cart from '../../../models/Cart.model.js'
import fs from 'fs'
import ProductManager from "./ProductManager.js"


export default class CartManager {
    
    #path
    #cart
    #pathProduct

    constructor(path, pathProduct){
        this.#path = path
        this.#pathProduct = pathProduct
        this.carts = []
        this.cartModel = new Cart(this.#path)
        this.productModel = new ProductManager(this.#pathProduct)
    }

    async createNewCartManager(){
        try {

            const cid = Math.floor(Math.random() * 999)

            const newCart = this.cartModel.setNewCart(cid)
            if(!newCart) throw 'Error create new cart manager'

            if(fs.existsSync(this.#path)){
                const cartCointainer = await fs.promises.readFile(this.#path, 'utf-8')

                this.carts = JSON.parse(cartCointainer)

                this.carts.push(newCart)

                await fs.promises.writeFile(this.#path, JSON.stringify(this.carts, null, 2))

                return newCart
            }else{
                this.carts.push(newCart)

                await fs.promises.writeFile(this.#path, JSON.stringify(this.carts))

                            
            return newCart
            }
            
        } catch (error) {
            throw error
        }
    }

    async getCartByIdManager(cid){
        try {
            if(!fs.existsSync) return this.carts

            const file = await fs.promises.readFile(this.#path, 'utf-8')
            this.carts = JSON.parse(file)

            const cart = this.carts.find(i=> i.cid == cid)

            if(!cart) throw {name: 'client error', httpcode: 404, description: 'Cart no encontrado'}

            return cart
        } catch (error) {
            throw error
        }
    }

    async setProductIntoCartManager(cid, pid){
        try {
            if(!fs.existsSync) return this.carts

            const cart = await this.getCartByIdManager(Number(cid))

            const product = await this.productModel.getProductsById(Number(pid))

            const fileCart = await fs.promises.readFile(this.#path, 'utf-8')
            this.carts = JSON.parse(fileCart)

            const updateCart = this.carts.filter(c=> c.cid !== Number(cid))

            const validateProduct = cart.products.find(p => p.id == Number(pid))

            if(validateProduct){

                const productQuantity = {
                    id: Number(pid),
                    quantity: validateProduct.quantity++
                }

                const newData = cart.products.filter(p=> p.id !== Number(pid))

                newData.push(productQuantity)
                
                updateCart.push(cart)
                
                await fs.promises.writeFile(this.#path, JSON.stringify(updateCart, null, 2))

                return cart
            }else{
                cart.products.push({
                    id: product.id,
                    quantity: 1
                })
                updateCart.push(cart)

                await fs.promises.writeFile(this.#path, JSON.stringify(updateCart, null, 2))

                return cart
            }

        } catch (error) {
            throw error
        }
    }

}