import UserModel from "../dao/db/models/User.js";
import bcrypt from 'bcryptjs'

export const signupService = async (first_name,last_name, email,age, password )=>{
    try {
        
        if(!first_name || !last_name || !email || !age || !password ) throw {name: 'client error', httpcode: 404, description: 'todas la credenciales son necesarias'} 

        const existsUser = await UserModel.findOne({email: email})
        if(existsUser) throw {name: 'client error', httpcode: 404, description: 'Ya existe ese email registrado'}

        const user = await UserModel.create({
            first_name: first_name, 
            last_name: last_name,
            age: age, 
            email: email,
            password: bcrypt.hashSync(password)
        })

        return user
    } catch (error) {
        throw error
    }
}

export const signinService = async (email, password)=>{
    try {
        if(!email || !password ) throw {name: 'client error', httpcode: 404, description: 'todas la credenciales son necesarias'}

        const user = await UserModel.findOne({email: email})
        if(!user) throw {name: 'client error', httpcode: 404, description: 'user no encontrado'}

        const validatePassword = bcrypt.compareSync( password, user.password)

        if(!validatePassword) throw {name: 'client error', httpcode: 404, description: 'credenciales invalidas'}

        return user
    } catch (error) {
        throw error
    }
}

export const logoutService = async ()=>{
    try {
        
    } catch (error) {
        throw error
    }
}