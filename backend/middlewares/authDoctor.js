import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()
// Doctor Authentication Middleware
const authDoctor= async(req,res,next)=>{
    try{
        const {dtoken}= req.headers
        if(!dtoken){
            return res.status(401).json({
                success:false,
                message: "Not Authorized Login Again"

            })
        }
        const token_decode= jwt.verify(dtoken,process.env.JWT_SECRET)
        req.docId = token_decode.id;
        
        next()


    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

}
export default authDoctor