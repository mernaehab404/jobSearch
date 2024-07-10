import { Router }from "express";
import { signin, signup } from "../controllers/AuthController.js";

import {checkUniqueness } from "../middleware/checkUniqueness.js";
import { updatePassword } from "../controllers/userController.js";

const AuthRouter= Router()

AuthRouter.post('/signup',checkUniqueness,signup)
AuthRouter.post('/signin',signin)
AuthRouter.put('/password',updatePassword)

export default AuthRouter