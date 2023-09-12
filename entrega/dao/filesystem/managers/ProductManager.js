import fs from 'fs'
import Product from '../../../models/Product.model.js'

export default class ProductManager {
    
    #path
    #countPath
    #products

    constructor(path, countPath){
        this.#path = path
        this.#countPath = countPath
        this.#products = []
        this.productModel = new Product()
    }

    // Este es un contador que simula un contador de sql, no den mucha importancia se puede hacer como ustedes prefieran
    async #geneteId(){
        try {
            // Valido si existe el archivo
            if(!fs.existsSync(this.#countPath)){
                // Si no existe
                // Inicio el contador en 1
                await fs.promises.writeFile(this.#countPath, JSON.stringify(1))

                return 1
            }else{
                // Leo el archivo
                const data = await fs.promises.readFile(this.#countPath, 'utf-8')
                let count = JSON.parse(data)
                
                // sumo 1 al contador interno
                const sumCount = count + 1
                await fs.promises.writeFile(this.#countPath, JSON.stringify(sumCount))

                return sumCount
            }

        } catch (error) {
            return console.log(error)
        }
    }


    async addProduct(title, description, code, price, stock, category){
        try {
            // Valido campos
            if(!title || !description || !code || !price || !stock || !category) throw 'Todos los datos son requiridos'
            // Aplico el metodo que trae todos los metodos y lo guardo this.products
            
            this.#products = await this.getProducts()

            // Valido el code exista o no exista
            const validateCode = this.#products.some(e=> e.code == code)
            if(validateCode) throw `Ya existe un producto con code: ${code} `

            // Uso el modelo del producto y genero un nuevo producto
            // Genero un id basadomento en un contador abstracto
            const newProduct = this.productModel.setNewProduct(title, description, code, price, stock, category)
            this.#products.push({
                id: await this.#geneteId(),
                ...newProduct
            })
            console.log(newProduct)
            // Sobreescribo la nueva lista de productos 
            await fs.promises.writeFile(this.#path, JSON.stringify(this.#products, null, 2))
            
            // Retorno el nuevo producto
            return newProduct
        } catch (error) {
            return console.log(error)
        }
    }

    async getProducts(){
        try {
            // Valido que exista el archivo
            if(!fs.existsSync(this.#path)){
                // Si no existe retorno un array vacio
                return this.#products
            } 
            else{
                // Si existe lo leo y lo parseo, retornando el array
                const data = await fs.promises.readFile(this.#path, 'utf-8')
                this.#products = JSON.parse(data)
    
                return this.#products
            }
        } catch (error) {
            return console.log(error)
        }
    }

    async getProductsById(id){
        try {
            // Leo el archivo y lo parseo
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)

            // aplico find para buscar producto despues de parsearlo
            const findProduct = this.#products.find(e=> e.id == id)
            if(!findProduct) throw 'Product not found'

            return findProduct
        } catch (error) {
            return console.log(error)
        }
    }

    async updateProduct(id, newData){
        try {
            // Aplico el mismo metodo getbyid para encontrar el producto
            const product = await this.getProductsById(id)
            // Aplico el metodo de all productos
            const allProducts = await this.getProducts()
            
            // Hago un filtro de productos
            const filter = allProducts.filter(i=> i.id != product.id)

            // modifico el primer producto
            const newUpdate = {
                id: id,
                ...product,
                ...newData,
            }

            // Aplico un push del nuevo producto a los productos filtrados
            filter.push(newUpdate)
            // Rescribo el nuevo archivo
            await fs.promises.writeFile(this.#path, JSON.stringify(filter, null, 2))

            return newUpdate
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            // Leo el documento
            const data = await fs.promises.readFile(this.#path, 'utf-8')
            this.#products = JSON.parse(data)

            // Aplico filter a la lista de productos parseados
            const productDeleted = this.#products.filter(e=> e.id !== id)

            // Rescribo el nuevo array de productos en el archivo
            await fs.promises.writeFile(this.#path, JSON.stringify(productDeleted, null, 2))

            return productDeleted
        } catch (error) {
            return console.log(error)
        }
    }

}
