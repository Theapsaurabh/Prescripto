import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'


// API to register user
const registerUser= async(req,res)=>{
    try{
        const{name, email, password}= req.body;
        if(!name, !email,!password){
            return res.json({
                success: false,
                message: "Missing details"
            })

        }
        if(!validator.isEmail(email)){
           return res.json({
                success: false,
                message: "Please Enter a valid email"
            })
        }
        if(password.length<8){
            return res.json(
                {
                    success:false,
                    message: "Enter a Strong password"
                }
            )
        }
        // hasing user password
        const salt= await bcrypt.genSalt(10);
        const hashedPassword= await bcrypt.hash(password,salt)


        const userData= {
            name,
            email,
            password: hashedPassword
        }
        const newUser= new userModel(userData)
        const user= await newUser.save()
        //_id

        const token= jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({
            success:true,
            token
        })





    }catch(error){
        console.log(error)
        res.json(
            {
                success:true,
                message:error.message
            }
        )

    }
}
// API for user login
const loginUser= async(req,res)=>{
    try{
        const {email, password}= req.body;
        const user= await userModel.findOne({email})
        if(!user){
          return  res.json({
                success:false,
                message: "User does not exist"
            })

        }

        const isMatch=  await bcrypt.compare(password, user.password)
        if(isMatch){
            const token= jwt.sign({
                id:user._id

            }, process.env.JWT_SECRET)
           return  res.json({
                success:true,
               token
            })
        }else{
          return  res.json({
                success:false,
                message: "Please Enter the valid password"
            })
        }

    }catch(error){
       return res.json({
            success:false,
            message: error.message
        })

    }
}

// API to get user profile data
const getProfile= async (req,res)=>{
    try{
        const { userId } = req.user;
        if (!userId) {
            return res.json({
                success: false,
                message: "User ID not provided",
            });
        }
        const userData= await userModel.findById(userId).select('-password')
        res.json({success:true, userData})


    }catch(error){
           return res.json({
            success:false,
            message: error.message
        })

    }

}

// API to update user profile
const updateProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { name, phone, address, dob, gender } = req.body;
        const imageFile = req.file;

        if (!name || !phone || !dob || !gender) {
            return res.json({
                success: false,
                message: "Data Missing"
            });
        }

        const updateData = {
            name,
            phone,
            dob,
            gender,
            address: JSON.parse(address),
        };

        
        if (imageFile) {
            const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image'
            });
            updateData.image = imageUpload.secure_url;
        }

        
        const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

        if (!updatedUser) {
            return res.json({
                success: false,
                message: "User not found"
            });
        }

        res.json({
            success: true,
            message: "Profile Updated",
            user: updatedUser
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};



export {registerUser, loginUser, getProfile, updateProfile}