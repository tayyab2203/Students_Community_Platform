import React from 'react';
import StudentRegistrationForm from '../components/forms/StudentRegistrationForm';
import { useAuth } from '../hooks/useAuth'; // Assuming to get current user ID

const EditProfile = () => {
  const { user } = useAuth();

  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-2xl font-bold text-[#111827] mb-4">Edit Profile</h1>
      <StudentRegistrationForm isEdit={true} studentId={user.id} />
    </div>
  );
};

export default EditProfile;