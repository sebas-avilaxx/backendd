import express, {response, request} from "express";
import {signinService, signupService, logoutService} from '../services/user.service.js'

export const signupController = async (req=request, res=response) =>{
    try {
        const {first_name,last_name, email,age, password} = req.body
        
        const data = await signupService(first_name,last_name, email,age, password)

        req.session.userId = data._id

        return res.status(201).json({
            status: "success",
            detail: "user registrado correctamente",
            payload: {
                userName: data.first_name,
                userLastName: data.last_name,
                age: data.age,
                email: data.email
            }
        })
    } catch (error) {
        return res.json({error})
    }
}

export const signinController = async (req=request, res=response) =>{
    try {
        const {email, password} = req.body

        const data = await signinService(email, password)

        req.session.userId = data._id

        return res.status(201).json({
            status: "success",
            detail: "user registrado correctamente",
            payload: {
                userName: data.first_name,
                userLastName: data.last_name,
                age: data.age,
                email: data.email
            }
        })
    } catch (error) {
        return res.json({error})
    }
}

export const logoutController = async (req=request, res=response) =>{
    try {

            req.session.destroy(function(err) {
                if(err){
                    console.log(err)
                    return res.status(500).send('Error al cerrar sesión')
                }else{
                            //   Regresa el user a home
                            //   res.redirect('/') // Esto sirve para views
                            
                    return res.status(200).json({
                        status: "success",
                        details: "logout success"
                    })
                }
            })

    } catch (error) {
        return res.json({error})
    }
}