import { Router } from "express";
import {signinController, signupController, logoutController} from '../controllers/user.controller.js'

const router = Router()



router.post('/signup', signupController)

router.get('/signin', signinController)

router.get('/logout', logoutController)

export default router