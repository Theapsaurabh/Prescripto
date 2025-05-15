import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const navigate = useNavigate();

  const applyFilter = (speciality) => {
    if (speciality) {
      setFilteredDoctors(doctors.filter(doc => doc.speciality === speciality));
    } else {
      setFilteredDoctors(doctors);
    }
  };

  useEffect(() => {
    applyFilter(speciality);
  }, [doctors, speciality]);

  return (
    <div className="p-6">
      <p className="text-xl mb-4 font-semibold">Browse through specialist doctors.</p>

      {/* Filter Options */}
      <div className="flex flex-wrap gap-3 mb-6 text-sm text-blue-600 cursor-pointer">
        {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec, idx) => (
          <span
            key={idx}
            onClick={() => applyFilter(spec)}
            className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full transition"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {filteredDoctors.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-800 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300"
          >
            <img className="w-full h-40 object-cover bg-blue-50" src={item.image} alt={item.name} />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Doctors;