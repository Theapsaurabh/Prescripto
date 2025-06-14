import React, { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { motion } from 'framer-motion';
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
          // add slot to array
          timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
        }


        

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot((prevSlots) => [
        ...prevSlots,
        {
          date: dayDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: '2-digit', day: '2-digit' }),
          slots: timeSlots,
        },
      ]);
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please login to book an appointment.');
      return navigate('/login');
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

      const payload = {
        docId,
        slotDate,
        slotTime,
      };

      const { data } = await axios.post(`${backendUrl}/api/user/book-appointment`, payload, {
        headers: {
          token,
        },
      });

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

  if (!docInfo) {
    return <p>Loading doctor info...</p>;
  }

  return (
    <div>
      {/* Doctor Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className='flex flex-col sm:flex-row gap-4'
      >
        <motion.div whileHover={{ scale: 1.03 }} className='rounded-xl overflow-hidden shadow-md'>
          <img className='bg-blue-400 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="Doctor" />
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4 }}
          className='flex-1 border border-white rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-xl'
        >
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-950'>
            {docInfo.name}
            <img className='w-5' src={assets.verified_icon} alt="verified" />
          </p>
          <div className='flex items-center gap-2 text-gray-500 text-sm mt-1'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div className='mt-3'>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900'>About
              <img src={assets.info_icon} alt="info" />
            </p>
            <p className='text-sm text-gray-500 mt-1'>{docInfo.about}</p>
          </div>
          <p className='text-lg mt-4 font-medium text-gray-900'>
            Appointment Fee: <span>{currencySymbol}{docInfo.fees}</span>
          </p>
        </motion.div>
      </motion.div>

      {/* Available Slots */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className='sm:ml-72 sm:pl-4 mt-6 font-medium text-gray-700'
      >
        <p className='text-lg mb-2'>Booking slots</p>

        <div className='flex gap-3 overflow-x-auto mt-4 pb-2'>
          {docSlot.map((item, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime('');
              }}
              key={index}
              className={`min-w-44 px-4 py-6 rounded-xl text-center transition cursor-pointer ${
                slotIndex === index ? 'bg-blue-600 text-white shadow-md' : 'border border-gray-300 bg-white'
              }`}
            >
              <p className='text-sm font-semibold'>{item.date}</p>
            </motion.div>
          ))}
        </div>

        <div className='flex gap-3 overflow-x-auto mt-4 pb-2'>
          {docSlot[slotIndex]?.slots.map((item, index) => (
            <motion.p
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSlotTime(item.time)}
              key={index}
              className={`text-sm px-5 py-2 rounded-full cursor-pointer border transition-all ${
                item.time === slotTime ? 'bg-blue-500 text-white border-blue-500' : 'text-gray-500 border-gray-300'
              }`}
            >
              {item.time.toLowerCase()}
            </motion.p>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 shadow-lg hover:bg-blue-600 transition'
          onClick={bookAppointment}
        >
          Book an Appointment
        </motion.button>
      </motion.div>

      {/* Related Doctors */}
      <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
    </div>
  );
}

export default Appointment;
