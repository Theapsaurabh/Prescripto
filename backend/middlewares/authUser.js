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
        req.user = { userId: token_decode.id };
        
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