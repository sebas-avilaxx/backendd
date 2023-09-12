import mongoose, { Schema } from 'mongoose';

const CartSchema = new Schema({
    products: {
        type: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product'
                }, 
                quantity: { type: Number, default: 1 }
            }
        ],
        default: []
    }
})


const CartsModel = mongoose.model('Cart', CartSchema)
export default CartsModel