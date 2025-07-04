import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-center gap-4 py-16 text-gray-800 md:mx-10' id='doctors'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 sm:px-0 px-3'>
        {relDoc.slice(0, 5).map((item) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
            className='border border-blue-800 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 bg-white'
            key={item._id}
          >
            <img className='w-full h-40 object-cover bg-blue-50' src={item.image} alt={`${item.name} profile`} />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm mb-1 ${
                item.isAvailable ? 'text-green-500' : 'text-red-500'
              }`}>
                <span className={`w-2 h-2 rounded-full inline-block ${
                  item.isAvailable ? 'bg-green-500' : 'bg-red-500'
                } animate-pulse`}></span>
                <p>{item.isAvailable ? 'Available' : 'Not Available'}</p>
              </div>
              <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
              <p className='text-gray-600 text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/doctors');
          window.scrollTo(0, 0);
        }}
        className='bg-blue-500 text-white px-12 py-3 rounded-full mt-10 hover:bg-blue-600 transition'
      >
        More
      </button>
    </div>
  );
};

export default RelatedDoctors;
