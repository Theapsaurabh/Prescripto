import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import Doctors from "./Doctors";
import { toast } from "react-toastify";
import { useEffect } from "react";



const MyAppointment = () => {
  const {backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] =useState([]);
  const months = [" ","jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const slotDateFormate= (slotDate)=>{
    const dateArray= slotDate.split('_');
    return dateArray[0]+ ' ' + months[parseInt(dateArray[1])] + ' ' + dateArray[2];

  }

   const getUserAppointments = async ()=>{
    try{
      const {data}= await axios.get(`${backendUrl}/api/user/appointments`, {headers:{token}});
      if(data.success){
        setAppointments(data.appointments.reverse());
        console.log(data.appointments);


      }
    }catch(error){
      console.log(error);
      toast.error(error.message || "Failed to fetch appointments. Please try again later.");

    }
   }
   const cancelAppointment = async (appointmentId) => {
    try{

      const {data}= await axios.post(`${backendUrl}/api/user/cancel-appointment`, {appointmentId}, {headers:{token}});
      if(data.success){
        toast.success(data.message);
        getUserAppointments(); 
        getDoctorsData(); 



      }else{
        toast.error(data.message || "Failed to cancel appointment. Please try again later.");
      }

    }catch(error){
      console.log(error);
      toast.error(error.message || "Failed to fetch appointments. Please try again later.");


    }
   }


   useEffect(()=>{
    if(token) getUserAppointments();

   },[token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4 py-10 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pink-400 drop-shadow-md">
        My Appointments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {appointments.map((item, index) => (
          <div
            key={index}
            className="bg-black/70 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-md hover:shadow-pink-400 transition duration-500"
          >
            {/* Profile section */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 bg-indigo-50 rounded-full shadow-lg flex items-center justify-center mb-4">
                <img
                  src={item.docData.image}
                  alt={`Dr. ${item.docData.name}`}
                  className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/128";
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white">Dr. {item.docData.name}</h3>
              <p className="text-sm text-pink-400">{item.docData.speciality}</p>
            </div>

            {/* Address section */}
            <div className="mb-4 text-center text-sm space-y-1">
              <p className="font-semibold text-white">Address:</p>
              <p className="text-slate-300">{item.docData.address.line1}</p>
              <p className="text-slate-300">{item.docData.address.line2}</p>
            </div>

            {/* Appointment time */}
            <p className="text-sm text-center font-medium text-pink-300 mb-6">
              <span className="font-semibold text-white">Date & Time:</span> {slotDateFormate(item.slotDate)} | {item.slotTime}
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
             { !item.cancelled &&  <button className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300 shadow-md text-sm">
                Pay Online
              </button>}
              {!item.cancelled &&  <button onClick={ ()=>cancelAppointment(item._id)} className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300 shadow-md text-sm">
                Cancel
              </button> }
              {item.cancelled && <button className="px-4 py-2 rounded-lg bg-gray-500 text-white transition duration-300 shadow-md text-sm">
                Cancelled
              </button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;