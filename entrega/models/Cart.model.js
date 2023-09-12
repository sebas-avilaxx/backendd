

export default class Cart {
    
    cid
    products
    
    constructor(){
        this.cid = 0
        this.products = []
    }

    setNewCart(cid){
        this.cid = cid
        this.products = []

        return this
    }
}