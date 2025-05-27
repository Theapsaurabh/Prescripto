import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import Doctor from '../models/doctorModel.js'
import jwt from "jsonwebtoken"

import dotenv from 'dotenv'
import doctorModel from '../models/doctorModel.js'
dotenv.config()



// API for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, experience, degree, about, fees, address } = req.body;
        const imageFile = req.file;
        console.log(imageFile)

        // Check all required fields
        if (!name || !email || !password || !speciality || !experience || !degree || !about || !fees || !address) {
            return res.status(400).json({
                success: false,
                message: "Missing details. Please enter all details.",
            });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({
                success: false,
                message: "Please enter a valid email.",
            });
        }

        // Validate password strength
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters.",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        

        // ✅ Upload image to Cloudinary (here's your new code)
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
  
  use_filename: true,
  unique_filename: true,
  resource_type: 'image',
});
const imageUrl = imageUpload.secure_url;


        // Prepare doctor data
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now(),
        };

        const newDoctor = new Doctor(doctorData);
        await newDoctor.save();

        res.status(200).json({
            success: true,
            message: "Doctor added successfully.",
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


//  API for Admin Login

const loginAdmin= async(req,res)=>{
    try {
        const {email,password}= req.body;
        if(email=== process.env.ADMIN_EMAIL && password=== process.env.ADMIN_PASSWORD){
           const token= jwt.sign(email+password,process.env.JWT_SECRET ) 
           res.status(200).json({
            success:true,
            token
           })


   

        }else{
            res.status(401).json({
                success:false,
                message:"Enter Correct Email or Password"
            })
        }



    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
}

// API to get all doctor list for admin pannel 
const allDoctors= async (req,res)=>{
    try{
        const doctors= await doctorModel.find({}).select('-password')
        res.json({
            success:true,
            doctors
        })

    }catch(error){
        console.error(error);
        res.status(500).json({
            success: false,
            message: error.message,
        });
        
    }

}


export { addDoctor, loginAdmin, allDoctors };