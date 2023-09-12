

// Creo un module simple del producto a trabajar
export default class Product {

    title
    description
    code
    price
    status
    stock
    category
    thumbnail
    

    constructor(){
        
        this.title = ''
        this.description = ''
        this.code = ''
        this.price = 0
        this.status = true
        this.stock = 0
        this.category = ''
        this.thumbnail = []

    }

    setNewProduct(title, description, code, price, stock, category){
        this.title = title
        this.description = description
        this.code = code
        this.price = price
        this.status = true
        this.stock = stock
        this.category = category
        this.thumbnail = []
        
        return this
    }
}