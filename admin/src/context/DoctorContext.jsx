import { createContext,useState } from "react";
import App from "../App";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext()
const DoctorContextProvider = (props) => {
    const backendUrl = "https://prescripto-backend-b806.onrender.com"
    const[dToken, setDToken] = useState(localStorage.getItem('dToken')? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData]= useState(false);

    const getAppointments= async()=>{
        try{
            const {data}= await axios.get(`${backendUrl}/api/doctor/appointments`, {headers:{dtoken:dToken}});
            if(data.success){
                setAppointments(data.appointments);
                console.log(data.appointments.reverse())
            }else{
                toast.error(data.message);
            }

        }catch(error){
            console.error(error);
            toast.error(error.message);

        }
    }

    const completeAppointment= async(appointmentId)=>{
   try{

    const {data}= await axios.post(`${backendUrl}/api/doctor/complete-appointment`, {appointmentId}, {headers:{dtoken:dToken}});
    if(data.success){
        toast.success(data.message);
        getAppointments();
    }else{
        toast.error(data.message);
    }

   }catch(error){
    console.error(error);
    toast.error(error.message);

   }

    }

    const cancelAppointment= async(appointmentId)=>{
   try{

    const {data}= await axios.post(`${backendUrl}/api/doctor/cancel-appointment`, {appointmentId}, {headers:{dtoken:dToken}});
    if(data.success){
        toast.success(data.message);
        getAppointments();
    }else{
        toast.error(data.message);
    }

   }catch(error){
    console.error(error);
    toast.error(error.message);

   }


    }


    const getDashData= async()=>{
        try{
            const {data}= await axios.get(`${backendUrl}/api/doctor/dashboard`, {headers:{dtoken:dToken}});
            if(data.success){
                setDashData(data.dashData);
                console.log(data.dashData);
            }else{
                toast.error(data.message);
            }
        }catch(error){
        console.error(error);
       toast.error(error.message);

        }
    }

    const getDoctorProfile= async()=>{
        try{
            const {data}= await axios.get(`${backendUrl}/api/doctor/profile`, {headers:{dtoken:dToken}});
            if(data.success){
                setProfileData(data.profileData);    
                console.log(data.profileData);
            }else{
                toast.error(data.message);
            }

        }catch(error){
            console.error(error);
            toast.error(error.message);

        }
    }


    
    const value={
        dToken,
        setDToken,
        backendUrl,
        appointments,
        setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        getDashData,
        dashData,
        setDashData,
        getDoctorProfile,
        profileData,
        setProfileData

    }
    return (
       <DoctorContext.Provider value={value}>  
        {props.children}
       </DoctorContext.Provider>
    )

}

export default DoctorContextProvider
