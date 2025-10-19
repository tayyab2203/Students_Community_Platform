import React from 'react';
import StudentRegistrationForm from '../components/forms/StudentRegistrationForm';

const StudentRegistration = () => {
  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-2xl font-bold text-[#111827] mb-4">Register as Student</h1>
      <StudentRegistrationForm isEdit={false} />
    </div>
  );
};

export default StudentRegistration;