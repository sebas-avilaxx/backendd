import mongoose, {Schema} from 'mongoose' 

const productSchema = new Schema({
    title:        { type: String, required: true },
    description:  { type: String, required: true },
    code:         { type: String, unique: true, required: true },
    price:        { type: Number, required: true},
    status:       { type: Boolean, default: true },
    stock:        { type: Number, required: true },
    category:     { type: String, required: true },
    thumbnail:    [String]
})

const ProductsModel = mongoose.model('Product', productSchema )
export default ProductsModel