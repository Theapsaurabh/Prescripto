import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify';
import axios from 'axios';

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const [docInfo, setDocInfo] = useState(null);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const foundDoc = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoc || null);
    }
  }, [doctors, docId]);

  const getAvailableSlots = async () => {
    setDocSlot([]);
    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let dayDate = new Date(currentDate);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10, 0, 0, 0);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      let timeSlots = [];
      while (currentDate <= endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        let day = currentDate.getDate(); 
        let month= currentDate.getMonth() + 1; 
        let year= currentDate.getFullYear();
        const slotDate = `${day}_${month}_${year}`;
        const slotTime = formattedTime;
        const isSlotAvailable = !(docInfo.slots_booked[slotDate]?.includes(slotTime));

        if(isSlotAvailable){
          timeSlots.push({ datetime: new Date(currentDate), time: formattedTime });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot(prevSlots => [...prevSlots, {
        date: dayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }),
        slots: timeSlots,
      }]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment.');
      return navigate('/login');
    }
    if (!docInfo.available) {
      toast.error("This doctor is currently unavailable for appointments.");
      return;
    }
    if (!slotTime) {
      toast.warn('Please select a time slot.');
      return;
    }

    try {
      const selectedSlot = docSlot[slotIndex].slots.find(slot => slot.time === slotTime);
      const datetime = selectedSlot?.datetime;

      if (!datetime) {
        toast.error('Invalid slot selected.');
        return;
      }

      const day = datetime.getDate();
      const month = datetime.getMonth() + 1;
      const year = datetime.getFullYear();
      const slotDate = `${day}_${month}_${year}`;

      const payload = { docId, slotDate, slotTime };
      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, payload, { headers: { token } });

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || 'An error occurred while booking the appointment.');
    }
  };

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  if (!docInfo) return <p>Loading doctor info...</p>;

  return (
    <div className="px-4 py-8">
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="rounded-xl overflow-hidden shadow-md hover:scale-105 transition-transform">
          <img className="bg-blue-400 w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="Doctor" />
        </div>
        <div className="flex-1 border border-white rounded-lg p-6 bg-white shadow-lg">
          <p className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="verified" />
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <span className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</span>
          </div>
          <div className="mt-3">
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900">About
              <img src={assets.info_icon} alt="info" />
            </p>
            <p className="text-sm text-gray-500 mt-1">{docInfo.about}</p>
          </div>
          <p className="text-lg mt-4 font-medium text-gray-900">
            Appointment Fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      <div className="mt-10 sm:ml-72 sm:pl-4">
        <p className="text-lg mb-2 font-medium text-gray-700">Booking slots</p>

        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlot.map((item, index) => (
            <div
              onClick={() => {
                setSlotIndex(index);
                setSlotTime('');
              }}
              key={index}
              className={`min-w-44 px-4 py-6 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                slotIndex === index ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-300 bg-white text-gray-700'
              }`}
            >
              <p className="text-sm font-semibold">{item.date}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 overflow-x-auto mt-4 pb-2">
          {docSlot[slotIndex]?.slots.map((item, index) => (
            <p
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm px-5 py-2 rounded-full cursor-pointer border transition-all ${
                item.time === slotTime ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookAppointment}
          className="bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 shadow-lg hover:bg-blue-600 transition"
        >
          Book an Appointment
        </button>
      </div>

      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;
