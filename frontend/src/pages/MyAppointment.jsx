import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useState } from "react";
import axios from "axios";
import Doctors from "./Doctors";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const MyAppointment = () => {
  const {backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [appointments, setAppointments] =useState([]);
  const months = [" ","jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  


  const slotDateFormate= (slotDate)=>{
    const dateArray= slotDate.split('_');
    return dateArray[0]+ ' ' + months[parseInt(dateArray[1])] + ' ' + dateArray[2];

  }
  const navigate = useNavigate();

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
   const initPay= (order)=>{
    const options={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Payment for appointment booking",
      order_id: order.id,

     receipt: order.receipt, 

      handler: async (response) => {
  console.log(response);
  try {
    const { data } = await axios.post(`${backendUrl}/api/user/verifyRazorpay`, {
      response,
    }, {
      headers: { token }
    });

    if (data.success) {
      getUserAppointments();
      navigate('/my-appointments');
      toast.success("Payment successful! Your appointment is confirmed.");
    } else {
      toast.error(data.message || "Payment verification failed. Please try again.");
    }

  } catch (error) {
    console.error(error);
    toast.error(error.message || "Verification error");
  }
}

    }
    const rzp= new window.Razorpay(options);
    rzp.open();

   }

  const appointmentRazorpay= async(appointmentId)=>{
    try{
      const {data}= await axios.post(`${backendUrl}/api/user/payment-razorpay`, {appointmentId}, {headers:{token}});
      if(data.success){
       initPay(data.order);
      }

    }catch(error){
      console.log(error)

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
  className="bg-black/70 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md hover:shadow-pink-400 transition duration-500"
>
  {/* Doctor Profile Image & Info */}
  <div className="flex flex-col items-center text-center mb-8">
    <div className="w-40 h-40 bg-indigo-50 rounded-full shadow-lg flex items-center justify-center mb-4">
      <img
        src={item.docData.image}
        alt={`Dr. ${item.docData.name}`}
        className="w-36 h-36 rounded-full object-cover border-2 border-white shadow-md"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/128";
        }}
      />
    </div>
    <h3 className="text-2xl font-bold text-white">Dr. {item.docData.name}</h3>
    <p className="text-base text-pink-400">{item.docData.speciality}</p>
  </div>

  {/* Address */}
  <div className="mb-6 text-center text-base space-y-1">
    <p className="font-semibold text-white">Address:</p>
    <p className="text-slate-300">{item.docData.address.line1}</p>
    <p className="text-slate-300">{item.docData.address.line2}</p>
  </div>

  {/* Date and Time */}
  <p className="text-base text-center font-medium text-pink-300 mb-8">
    <span className="font-semibold text-white">Date & Time:</span>{" "}
    {slotDateFormate(item.slotDate)} | {item.slotTime}
  </p>

  {/* Buttons */}
  <div className="flex justify-center gap-4 flex-wrap">
    {!item.cancelled && item.payment && !item.isCompleted && (
      <button className="px-6 py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white transition duration-300 shadow-md text-base">
        Paid
      </button>
    )}
    {!item.cancelled && !item.payment && !item.isCompleted && (
      <button
        onClick={() => appointmentRazorpay(item._id)}
        className="px-6 py-3 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300 shadow-md text-base"
      >
        Pay Online
      </button>
    )}
    {!item.cancelled && !item.isCompleted && (
      <button
        onClick={() => cancelAppointment(item._id)}
        className="px-6 py-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300 shadow-md text-base"
      >
        Cancel
      </button>
    )}
    {item.cancelled && !item.isCompleted && (
      <button className="px-6 py-3 rounded-lg bg-gray-500 text-white transition duration-300 shadow-md text-base">
        Cancelled
      </button>
    )}
    {item.isCompleted && (
      <button className="px-6 py-3 rounded-lg bg-green-600 text-white transition duration-300 shadow-md text-base">
        Completed
      </button>
    )}
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default MyAppointment;