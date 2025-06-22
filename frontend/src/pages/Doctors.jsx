import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

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
      <p className="text-xl mb-4 font-semibold opacity-0 animate-fadeInUp">
        Browse through specialist doctors.
      </p>

     
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search doctor by name..."
        className="border px-4 py-2 mb-4 w-full sm:w-1/2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
      />

     
      <button
        className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
          showFilter ? 'bg-blue-400 text-white ' : ''
        }`}
        onClick={() => setShowFilter((prev) => !prev)}
      >
        Filters
      </button>

      
      <div
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
          <span
            key={idx}
            onClick={() => applyFilter(spec, searchTerm)}
            className="bg-blue-100 hover:bg-blue-300 hover:text-white px-3 py-1 rounded-full transition-all duration-300 cursor-pointer shadow-sm"
          >
            {spec}
          </span>
        ))}
      </div>

      {/* Doctor Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {filteredDoctors.map((item, index) => {
          const isAvailable = item.available === true || item.available === 'true';

          return (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-800 rounded-xl overflow-hidden cursor-pointer bg-white transform hover:-translate-y-2 hover:shadow-lg transition-transform duration-300"
            >
              <img
                className="w-full h-40 object-cover bg-blue-50"
                src={item.image}
                alt={item.name.trim()}
              />
              <div className="p-4">
                <div
                  className={`flex items-center gap-2 text-sm mb-1 ${
                    isAvailable ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full inline-block animate-pulse ${
                      isAvailable ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  ></span>
                  <p>{isAvailable ? 'Available' : 'Not Available'}</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name.trim()}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Doctors;
