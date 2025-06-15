import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js';
import appointmentModel from '../models/appointmentModel.js';
import razorpay from 'razorpay'



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

// api to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.user.userId;

    if (!userId || !docId || !slotDate || !slotTime) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const docData = await doctorModel.findById(docId).select('-password').lean();
    if (!docData || !docData.available) {
      return res.status(404).json({
        success: false,
        message: "Doctor not  available"
      });
    }

    
    let slots_booked = docData.slots_booked || {};
    if (slots_booked[slotDate]?.includes(slotTime)) {
      return res.json({
        success: false,
        message: "Slot not available"
      });
    }

    if (slots_booked[slotDate]) {
      slots_booked[slotDate].push(slotTime);
    } else {
        slots_booked[slotDate]=[];
      slots_booked[slotDate].push[slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    delete docData.slots_booked;

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount: docData.fees,
      slotTime,
      slotDate,
      date:  Date.now()
    };

    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();

    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment booked successfully"
    });

  } catch (error) {
    console.error("Book Appointment Error:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// API to get user Appointmet for frontend my-appointment pages
const listAppointment = async (req,res)=>{
    try{
        const userId = req.user.userId;
        const appointments= await appointmentModel.find({userId})

        res.json({
            success:true,
            appointments
        })


    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })
    }
}
// API to cancel Appointment 

const cancelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const userId = req.user.userId;

        if (!appointmentId) {
            return res.json({
                success: false,
                message: "Appointment ID is required"
            });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.json({
                success: false,
                message: "Appointment not found"
            });
        }

        // Verify appointment belongs to user
        if (appointmentData.userId.toString() !== userId) {
            return res.json({
                success: false,
                message: "Unauthorized action"
            });
        }

        // Mark appointment as cancelled
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Releasing Doctor Slots 
        const { docId, slotDate, slotTime } = appointmentData;
        const docData = await doctorModel.findById(docId);

        if (docData && docData.slots_booked && docData.slots_booked[slotDate]) {
            docData.slots_booked[slotDate] = docData.slots_booked[slotDate].filter(e => e !== slotTime);

            await doctorModel.findByIdAndUpdate(docId, { slots_booked: docData.slots_booked });
        }

        res.json({
            success: true,
            message: "Appointment Cancelled"
        });

    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: error.message
        });
    }
};

const razorpayInstance= new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})
// API to make payment of appointment using razorpay
const paymentRazorpay= async(req,res)=>{
try{
    const {appointmentId}= req.body

    const appointmentData= await appointmentModel.findById(appointmentId)

    if(!appointmentData || appointmentData.cancelled){
        return res.json({
            success:false,
            message:"Appointment Cancelled or not found"
        })
    }

    // creating options for razorpay payment
    const options= {
        amount: appointmentData.amount*100,
        currency:process.env.CURRENCY,
        receipt: appointmentId
    }
   
    // creation of an order
    const order= await razorpayInstance.orders.create(options)
    console.log("Razorpay Order:", order);
    res.json({
        success:true,
        order,
        key: process.env.RAZORPAY_KEY_ID
    })


}catch(error){
    console.log(error);
        res.json({
            success: false,
            message: error.message
        });

}


    


}

// API to verify payment of razorpay
const verifyRazorpay= async(req,res)=>{
    try{

        const { razorpay_order_id } = req.body.response; 
        const orderInfo= await razorpayInstance.orders.fetch(razorpay_order_id)

        console.log(orderInfo)
        if(orderInfo.status==='paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            res.json({
                success:true,
                message:"Payment Successful"
            })


        }else{
            res.json({
                success:false,
                message:"Payment Failed"
            })
          
        }


    }catch(error){
        console.log(error)
        res.json({
            success:false,
            message:error.message
        })

    }

}


export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment, paymentRazorpay, verifyRazorpay}