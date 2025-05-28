import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()
// user Authentication Middleware
const authUser= async(req,res,next)=>{
    try{
        const {token}= req.headers
        if(!token){
            return res.status(401).json({
                success:false,
                message: "Not Authorized Login Again"

            })
        }
        const token_decode= jwt.verify(token,process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
           return res.status(401).json({
                success:false,
                message: "Not Authorized Login Again"

            })
        }
        req.body.userId= token_decode.id
        next()


    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}
export default authUser