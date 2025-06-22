import React, { useEffect, useContext } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';

const DoctorDashboard = () => {
  const { dToken, dashData, getDashData, completeAppointment, cancelAppointment } = useContext(DoctorContext);
  const { currency, slotDateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken]);

  return dashData && (
    <div className="p-4 md:p-6 lg:p-8 w-full max-w-7xl mx-auto">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition-all">
          <img className="w-14" src={assets.earning_icon} alt="Earnings" />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {currency}{dashData.earnings}
            </p>
            <p className="text-gray-500">Earnings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition-all">
          <img className="w-14" src={assets.appointment_icon} alt="Appointments" />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashData.appointments}
            </p>
            <p className="text-gray-500">Appointments</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow hover:shadow-md transition-all">
          <img className="w-14" src={assets.patients_icon} alt="Patients" />
          <div>
            <p className="text-2xl font-semibold text-gray-700">
              {dashData.patients}
            </p>
            <p className="text-gray-500">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="mt-10 bg-white rounded-2xl shadow overflow-hidden">
        <div className="flex items-center gap-3 p-5 border-b">
          <img src={assets.list_icon} className="w-5 h-5" alt="List Icon" />
          <h2 className="font-semibold text-lg text-gray-700">Latest Bookings</h2>
        </div>
        <div className="divide-y max-h-[65vh] overflow-y-auto">
          {dashData.latestAppointments.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
              <img className="w-10 h-10 rounded-full object-cover" src={item.userData.image} alt="Doctor" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-800">{item.userData.name}</p>
                <p className="text-sm text-gray-500">{slotDateFormate(item.slotDate)}</p>
              </div>
              {item.cancelled ? (
                            <p className="text-red-600 text-xs font-medium ">Cancelled</p>
                          ) : item.isCompleted ? (
                            <p className="text-green-600 text-xs font-medium">Completed</p>
                          ) : (
                            <div className="flex">
                              <img
                                onClick={() => cancelAppointment(item._id)}
                                className="w-10 cursor-pointer"
                                src={assets.cancel_icon}
                                alt=""
                              />
                              <img
                                onClick={() => completeAppointment(item._id)}
                                className="w-10 cursor-pointer"
                                src={assets.tick_icon}
                                alt=""
                              />
                            </div>
                          )
                        }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
