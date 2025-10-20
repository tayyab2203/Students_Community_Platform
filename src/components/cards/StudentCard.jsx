import React from 'react';
import { Link } from 'react-router-dom';

const StudentCard = ({ student }) => {
  return (
    <div className="bg-[#F3F4F6] p-4 rounded-lg shadow-md border border-[#E5E7EB]">
      <img src={student.picture || '/assets/images/default.png'} alt={student.name} className="w-20 h-20 rounded-full mx-auto mb-2" />
      <h3 className="text-xl font-bold text-[#111827]">{student.name}</h3>
      <p className="text-[#1F2937]">{student.category}</p>
      <p className="text-[#1F2937]">{student.semester}</p>
      <Link to={`/profile/${student.id}`}>
        <button className="bg-[#1E3D99] text-white px-4 py-2 rounded mt-2">View Profile</button>
      </Link>
    </div>
  );
};

export default StudentCard;