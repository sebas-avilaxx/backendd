import mongoose, {Schema} from 'mongoose' 

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name:  { type: String, required: true },
    email:      { type: String, required: true },
    age:        { type: Number, required: true },
    role:       { type: String, required: true, default: 'user' },
    password:   { type: String, required: true },
})

const UserModel = mongoose.model('User', userSchema )
export default UserModel