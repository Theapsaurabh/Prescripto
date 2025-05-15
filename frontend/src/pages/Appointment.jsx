import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors } = useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);

  useEffect(() => {
    if (doctors && doctors.length > 0) {
      const foundDoc = doctors.find(doc => doc._id === docId);
      setDocInfo(foundDoc || null);
      console.log('Doctor found:', foundDoc);
    }
  }, [doctors, docId]);

  if (!docInfo) {
    return <p>Loading doctor info...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">{docInfo.name}</h2>
      <img 
        src={docInfo.image} 
        alt={docInfo.name} 
        className="w-full max-w-md h-60 object-cover rounded-lg mb-4"
        onError={e => { e.target.src = '/fallback-image.png'; }} // optional fallback image
      />
      <p><strong>Speciality:</strong> {docInfo.speciality}</p>
      <p><strong>Degree:</strong> {docInfo.degree}</p>
      <p><strong>Experience:</strong> {docInfo.experience}</p>
      <p><strong>Fees:</strong> ${docInfo.fees}</p>
      <p><strong>About:</strong> {docInfo.about}</p>
      <p>
        <strong>Address:</strong> {docInfo.address?.line1}, {docInfo.address?.line2}
      </p>
    </div>
  );
};

export default Appointment;