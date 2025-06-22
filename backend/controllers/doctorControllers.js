import appointmentModel from '../models/appointmentModel.js';
import doctorModel from '../models/doctorModel.js';

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailablity = async (req, res) => {
  try {
    const { docId } = req.body;

    const docData = await doctorModel.findById(docId); 
    if (!docData) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found',
      });
    }

    docData.available = !docData.available;
    await docData.save();

    res.json({
      success: true,
      message: `Availability changed`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const doctorList = async (req, res) => {
  try {
    const doctors = await doctorModel.find().select('-password -email'); 
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

const loginDoctor= async(req,res)=>{
  try{
    const{email,password}= req.body;
    const doctor= await doctorModel.findOne({email})
    if(!doctor){
      return res.json({
        success:false,
        message: "Invalid Credentials"
      })
    }
    const isMatched= await bcrypt.compare(password,doctor.password) 
    if(isMatched){
      const token= jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
      res.json({
        success:true,
        token
      })

    }else{
      res.json({
        success:false,
        message: "Please Enter Correct Password"
      })
    }


  }catch(error){
    console.error(error);
    res.json({success:false, message:error.message})

  }
}


const appointmentsDoctor= async(req,res)=>{
  try{
    const { docId } = req;
    const appointments= await appointmentModel.find({docId})
    res.json({
      success:true,
      appointments
    })

  }catch(error){
     console.error(error);
    res.json({success:false, message:error.message})


  }
}

// API to marke appointment completed for doctor pannel
const appointmentComplete= async(req,res)=>{
  try{
    const { appointmentId}= req.body
    const docId = req.docId;
    const appointmentData=await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, {isCompleted:true})
      return res.json({
        success:true,
        message:"Appointment Completed"
      })


    }else{
       return res.json({
        success:false,
        message:"Failed"
      })
    }


  }catch(error){
    console.error(error);
    res.json({success:false, message:error.message})

  }

}


const appointmentCancel= async(req,res)=>{
  try{
    const { appointmentId}= req.body
    const docId = req.docId;
    const appointmentData=await appointmentModel.findById(appointmentId)
    if(appointmentData && appointmentData.docId===docId){
      await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})
      return res.json({
        success:true,
        message:"Appointment Cancelled"
      })


    }else{
       return res.json({
        success:false,
        message:" Cancellation Failed"
      })
    }


  }catch(error){
    console.error(error);
    res.json({success:false, message:error.message})

  }

}

// API to get dashboard to doctor pannel 

const doctorDashboard= async(req,res)=>{
  try{
    
    const docId = req.docId;
    const appointments= await appointmentModel.find({docId})
    let earnings= 0
    appointments.map((item)=>{
      if (item.isCompleted || item.payment) {
  earnings += item.amount;
}



    })
    let patients= []
    appointments.map((item)=>{
      if (!patients.includes(item.userId.toString())) {
  patients.push(item.userId.toString());
}


    })

    const dashData= {
      earnings,
      appointments: appointments.length,
      patients: patients.length,
      latestAppointments: appointments.reverse().slice(0,5),

    }
    res.json({
      success:true,
      dashData
    })

  }catch(error){
    console.error(error);
    res.json({success:false, message:error.message})

  }
}



const doctorProfile= async (req, res)=>{
  try{
    const docId = req.docId;
    const profileData= await doctorModel.findById(docId).select('-password')
    res.json({
      success:true,
      profileData
    })



  }catch(error){
     console.error(error);
    res.json({success:false, message:error.message})

  }
}


const updateDoctorProfile= async(req, res)=>{
  try{
    const {fee, address, available}= req.body;
    const docId = req.docId;
    await doctorModel.findByIdAndUpdate(docId, {fee, address, available})
    res.json({
      success:true,
      message: "Profile Updated"
    })


  }catch(error){
     console.error(error);
    res.json({success:false, message:error.message})

  }

}





export { changeAvailablity, doctorList, loginDoctor,
       appointmentsDoctor, appointmentComplete, appointmentCancel,
      doctorDashboard, doctorProfile, updateDoctorProfile };