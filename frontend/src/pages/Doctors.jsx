import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

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
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-xl mb-4 font-semibold"
      >
        Browse through specialist doctors.
      </motion.p>

      {/* Filter Options */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="flex flex-wrap gap-3 mb-6 text-sm text-blue-600"
      >
        {[
          'General physician',
          'Gynecologist',
          'Dermatologist',
          'Pediatricians',
          'Neurologist',
          'Gastroenterologist',
        ].map((spec, idx) => (
          <motion.span
            key={idx}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => applyFilter(spec)}
            className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full transition cursor-pointer shadow-sm"
          >
            {spec}
          </motion.span>
        ))}
      </motion.div>

      {/* Doctor Cards Grid */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6"
      >
        {filteredDoctors.map((item, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(0, 0, 255, 0.1)' }}
            transition={{ duration: 0.3 }}
            onClick={() => navigate(`/appointment/${item._id}`)}
            className="border border-blue-800 rounded-xl overflow-hidden cursor-pointer bg-white hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              className="w-full h-40 object-cover bg-blue-50"
              src={item.image}
              alt={item.name}
            />
            <div className="p-4">
              <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full inline-block animate-pulse"></span>
                <p>Available</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Doctors;