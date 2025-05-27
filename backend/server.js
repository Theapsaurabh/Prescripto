import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv';

import connectDB from "./config/mongodb.js";
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoutes.js';
import doctorRouter from './routes/doctorRoutes.js';
import userRouter from './routes/userRoutes.js';

dotenv.config();
// app config
const app= express();
const port= process.env.PORT || 4000;
connectDB()
connectCloudinary()

// middlewere
app.use(express.json());
app.use(cors());
// api end point
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRouter)
// 


app.get('/',(req,res)=>{
    res.send("api working Fine")

})
app.listen(port,()=>{
    console.log("Server is started at port:", port)
})

