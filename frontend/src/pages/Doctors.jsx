import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { motion } from 'framer-motion';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const applyFilter = (specialityFilter = speciality, nameFilter = searchTerm) => {
    let filtered = doctors;

    if (specialityFilter) {
      filtered = filtered.filter(doc =>
        doc.speciality.toLowerCase() === specialityFilter.toLowerCase()
      );
    }

    if (nameFilter) {
      filtered = filtered.filter(doc =>
        doc.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  useEffect(() => {
    applyFilter(speciality, searchTerm);
  }, [doctors, speciality]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    applyFilter(speciality, value);
  };

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

      {/* Search Input */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search doctor by name..."
        className="border px-4 py-2 mb-4 w-full sm:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
      />

      {/* Filters Button for Mobile */}
      <button
        className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
          showFilter ? 'bg-blue-400 text-white ' : ''
        }`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filters
      </button>

      {/* Speciality Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className={`text-sm text-blue-600 mt-4 mb-6 gap-3 ${
          showFilter ? 'flex flex-wrap' : 'hidden sm:flex flex-wrap'
        }`}
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
            onClick={() => applyFilter(spec, searchTerm)}
            className="bg-blue-100 hover:bg-blue-300 hover:text-white px-3 py-1 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
          >
            {spec}
          </motion.span>
        ))}
      </motion.div>

      {/* Doctor Cards Grid */}
      <motion.div
        key={filteredDoctors.map(doc => doc._id).join(',')}
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
            whileHover={{
              scale: 1.03,
              boxShadow: '0 8px 24px rgba(0, 0, 255, 0.1)',
            }}
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