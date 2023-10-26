import { Router } from "express";
import products from "./products.routes.js";
import cart from "./carts.routes.js";
import session from "./session.routes.js";
<<<<<<< HEAD
import mock from "./mock.routes.js";
=======
>>>>>>> 74f1aec62117996c0eb593c39de349df07d68c1d

const router = Router();

router.use('/api/products', products);
router.use('/api/carts', cart);
router.use('/api/sessions', session);
<<<<<<< HEAD
router.use('/api', mock);
=======
>>>>>>> 74f1aec62117996c0eb593c39de349df07d68c1d

export default router;