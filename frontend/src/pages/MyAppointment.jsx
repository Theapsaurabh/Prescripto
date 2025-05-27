import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const MyAppointment = () => {
  const { doctors } = useContext(AppContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 px-4 py-10 text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-pink-400 drop-shadow-md">
        My Appointments
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {doctors.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="bg-black/70 rounded-3xl p-6 md:p-8 shadow-xl backdrop-blur-md hover:shadow-pink-400 transition duration-500"
          >
            {/* Profile section */}
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-32 h-32 bg-indigo-50 rounded-full shadow-lg flex items-center justify-center mb-4">
                <img
                  src={item.image}
                  alt={`Dr. ${item.name}`}
                  className="w-28 h-28 rounded-full object-cover border-2 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/128";
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-white">Dr. {item.name}</h3>
              <p className="text-sm text-pink-400">{item.speciality}</p>
            </div>

            {/* Address section */}
            <div className="mb-4 text-center text-sm space-y-1">
              <p className="font-semibold text-white">Address:</p>
              <p className="text-slate-300">{item.address.line1}</p>
              <p className="text-slate-300">{item.address.line2}</p>
            </div>

            {/* Appointment time */}
            <p className="text-sm text-center font-medium text-pink-300 mb-6">
              <span className="font-semibold text-white">Date & Time:</span> 25 July, 2024 | 8:30 PM
            </p>

            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              <button className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white transition duration-300 shadow-md text-sm">
                Pay Online
              </button>
              <button className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition duration-300 shadow-md text-sm">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointment;