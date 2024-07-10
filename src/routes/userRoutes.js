import { Router }from "express";
import { deleteUser, getUser, getUserProfile, updateUser } from "../controllers/userController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {checkUniqueness} from "../middleware/checkUniqueness.js";


const userRouter= Router()

userRouter.use(verifyToken)

// Route to update user profile
userRouter.put('/',checkUniqueness,updateUser)

// Route to delete user profile
userRouter.delete('/',deleteUser)

// Route to get user profile
userRouter.get('/',getUser)

// Route to get user profile, accepting userId from either params or query
userRouter.get('/profile/:userId?', getUserProfile);



export default userRouter