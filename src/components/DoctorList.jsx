import React, { useState } from 'react';
import BookingModal from './Sidebar';

export default function DoctorList({ doctors, onBook }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Specialists</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col items-center text-center">
            <img src={doctor.image} alt={doctor.name} className="w-24 h-24 rounded-full object-cover mb-4 border-2 border-blue-100" />
            <h3 className="text-lg font-bold text-gray-900">{doctor.name}</h3>
            <p className="text-blue-600 font-medium text-sm">{doctor.specialty}</p>
            <p className="text-gray-500 text-xs mt-1">Experience: {doctor.experience}</p>
            <button 
              onClick={() => setSelectedDoctor(doctor)}
              className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
            >
              Book Appointment
            </button>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <BookingModal 
          doctor={selectedDoctor} 
          onClose={() => setSelectedDoctor(null)} 
          onConfirm={onBook} 
        />
      )}
    </div>
  );
}