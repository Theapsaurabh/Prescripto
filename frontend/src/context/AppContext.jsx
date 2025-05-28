import { createContext, useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import App from "../App";
export const AppContext = createContext();


export const AppProvider = (props) => {
    const currencySymbol= "₹";
    const backendUrl= import.meta.env.VITE_BACKEND_URL;

    const [doctors, setDoctors] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'): false);


   
    const getDoctorsData= async()=>{
        try{
            const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
            
            
            if(data.success){
                setDoctors(data.doctors);

            }else{
                toast.error(data.message);
            }

        }catch(error){
           toast.error("Failed to fetch doctors data. Please try again later.");
            console.error("Fetch error:", error.message);


        }
    }
     const value={
        doctors, currencySymbol,
        token, setToken,
        backendUrl
    }
    useEffect(()=>{
        getDoctorsData();

    },[])
    return (
        <AppContext.Provider value={value}>
           {props.children}
        </AppContext.Provider>
    )

}
export default AppProvider;