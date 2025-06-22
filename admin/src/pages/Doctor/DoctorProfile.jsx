import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

const DoctorProfile = () => {
  const { dToken, getDoctorProfile, profileData, setProfileData } =
    useContext(DoctorContext);
  const { currency } = useContext(AppContext);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isedit, setIsEdit] = useState(false);
  const updateProfile= async()=>{
    try{
      const updateData= {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        
      }
      const {data}= await axios.post(
        backendUrl + "/api/doctor/update",
        updateData,
        { headers: { dtoken: dToken } }

      )
      if(data.success){
        toast.success(data.message);
        setIsEdit(false);
        getDoctorProfile();
      }else{
        toast.error(data.message);
      }

    }catch(error){
      console.error(error);
      console.log(error.message);

    }
  }

  useEffect(() => {
    if (dToken) {
      getDoctorProfile();
    }
  }, [dToken]);

  return (
    profileData && (
      <div className="w-full min-h-screen bg-gray-100 py-8 px-4 md:px-8 lg:px-16 flex justify-center">
        <div className="w-full max-w-7xl bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-10">
            <div className="flex justify-center items-center">
              <img
                src={profileData.image || "https://via.placeholder.com/300"}
                alt="Doctor"
                className="w-40 h-40 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full object-cover border-4 border-blue-500 shadow-md"
              />
            </div>

            <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
                {profileData.name}
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                {profileData.degree} — {profileData.speciality}
              </p>
              <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 text-sm rounded-full shadow">
                {profileData.experience} Years Experience
              </span>

              <p className="text-base sm:text-lg text-gray-700">
                <span className="font-semibold text-gray-600">
                  {" "}
                  Appointment Fee:
                </span>{" "}
                {currency}{" "}
                {isedit ? (
                  <input
                    type="number"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-2">
                <input onChange={()=>isedit ? setProfileData((prev) => ({ ...prev, available: !prev.available })) : null}
                  type="checkbox"
                  checked={profileData.available}
                  readOnly
                  className="accent-green-600 w-5 h-5"
                />
                <span className="text-sm text-gray-700">
                  {profileData.available
                    ? "Available for appointments"
                    : "Not available"}
                </span>
              </div>
              {
                isedit ? 
                 <button
                onClick={updateProfile}
                className="self-center lg:self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all"
              >
                Save
              </button>:
               <button
                onClick={() => setIsEdit(true)}
                className="self-center lg:self-start bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition-all"
              >
                Edit Profile
              </button>

              }

             
             
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-10 bg-gray-50">
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                About
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {profileData.about || "No description provided."}
              </p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Clinic Address
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {isedit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, address1: e.target.value },
                      }))
                    }
                    value={profileData.address.address1}
                  />
                ) : (
                  profileData.address?.address1 || "Address line 1 not provided"
                )}
                <br />
                {isedit ? (
                  <input
                    type="text"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        address: { ...prev.address, address2: e.target.value },
                      }))
                    }
                    value={profileData.address.address2}
                  />
                ) : (
                  profileData.address?.address2 || "Address line 1 not provided"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DoctorProfile;
