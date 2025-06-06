import express from "express";
import { registerUser,loginUser, getProfile } from "../controllers/userController.js";
import authAdmin from "../middlewares/authAdmin.js";
const userRouter= express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authAdmin, getProfile)




export default userRouter

