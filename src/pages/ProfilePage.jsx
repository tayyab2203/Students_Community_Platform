// import React from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { User, MessageSquare, Mail } from "lucide-react";
// import { useAppContext } from "../App";
// import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";

// const SkillBadge = ({ skill }) => (
//   <span className="px-4 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-sm font-medium shadow-sm hover:shadow-md hover:bg-blue-100 transition">
//     {skill}
//   </span>
// );

// const ProfilePage = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { students } = useAppContext();
//   const student = students.find((s) => s.id === parseInt(id));

//   if (!student)
//     return (
//       <div className="min-h-screen flex flex-col">
//         <Navbar />
//         <div className="flex-1 flex items-center justify-center text-gray-600 text-lg">
//           Profile not found 😢
//         </div>
//         <Footer />
//       </div>
//     );

//   const handleFollowClick = () => {
//     navigate(`/profile/${student.id}/followers`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <div className="flex-1 py-24  px-6">
//         <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-8">
//           {/* Header */}
//           <div className="flex flex-col md:flex-row items-center md:items-start gap-6 border-b pb-6">
//             {/* Profile Image / Initial */}
//             <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
//               {student.name.charAt(0)}
//             </div>

//             {/* Info */}
//             <div className="text-center md:text-left">
//               <h2 className="text-2xl font-bold text-gray-900">{student.name}</h2>
//               <p className="text-gray-500 mt-1">{student.semester}</p>

//               <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
//                 <button 
//                   onClick={handleFollowClick}
//                   className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   <User size={16} /> Followers
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition">
//                   <MessageSquare size={16} /> Message
//                 </button>
//                 <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
//                   <Mail size={16} /> Contact
//                 </button>
//               </div>

//               {/* Followers / Following Links */}
//               <div className="flex justify-center md:justify-start gap-6 mt-3 text-gray-500 text-sm">
//                 <Link
//                   to={`/profile/${student.id}/followers`}
//                   className="hover:text-blue-700 transition"
//                 >
//                   {student.followers || 0} Followers
//                 </Link>
//                 <Link
//                   to={`/profile/${student.id}/following`}
//                   className="hover:text-blue-700 transition"
//                 >
//                   {student.following || 0} Following
//                 </Link>
//               </div>
//             </div>
//           </div>

//           {/* Bio */}
//           {student.bio && (
//             <div className="mt-8">
//               <h3 className="text-lg font-semibold text-gray-800 mb-2">Bio</h3>
//               <p className="text-gray-600 leading-relaxed">{student.bio}</p>
//             </div>
//           )}

//           {/* Skills */}
//           {student.skills?.length > 0 && (
//             <div className="mt-10">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Skills</h3>
//               <div className="flex flex-wrap gap-3">
//                 {student.skills.map((skill, index) => (
//                   <SkillBadge key={index} skill={skill} />
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Projects */}
//           {student.projects?.length > 0 && (
//             <div className="mt-12">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">Projects</h3>
//               <div className="grid md:grid-cols-3 gap-6">
//                 {student.projects.map((project, index) => (
//                   <div
//                     key={index}
//                     className="bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 transition rounded-xl p-6 shadow-sm hover:shadow-md"
//                   >
//                     <h4 className="text-gray-800 font-semibold">
//                       {project.title || project}
//                     </h4>
//                     {project.tech && (
//                       <p className="text-gray-500 text-sm mt-1">{project.tech}</p>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Activity */}
//           {student.activity?.length > 0 && (
//             <div className="mt-12">
//               <h3 className="text-lg font-semibold text-gray-800 mb-3">
//                 Recent Activity
//               </h3>
//               <ul className="space-y-3 text-gray-600 text-sm">
//                 {student.activity.map((item, index) => (
//                   <li
//                     key={index}
//                     className="bg-gray-50 hover:bg-gray-100 transition rounded-lg px-4 py-2 shadow-sm"
//                   >
//                     {item}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Availability */}
//           <div className="mt-10">
//             <p
//               className={`font-medium ${
//                 student.available ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {student.available
//                 ? "✅ Available for collaboration"
//                 : "❌ Not available for collaboration"}
//             </p>
//           </div>
//         </div>
//       </div>
      
//       <Footer />
//     </div>
//   );
// };

// export default ProfilePage;







import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useStudent from '../hooks/useStudent';
import ProjectCard from '../components/cards/ProjectCard';
import MessagingModal from '../components/modals/MessagingModal';
import {Loader} from '../components/ui/Loader';
import  useAuth  from '../hooks/useAuth';
import messagingService from '../services/messagingService';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { id } = useParams();
  const { student, isLoading } = useStudent(id);
  const { user } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [chatRoomId, setChatRoomId] = useState(null);
  const navigate = useNavigate();

  const handleMessage = async () => {
    try {
      const chatRoom = await messagingService.createChatRoom(student.id);
      setChatRoomId(chatRoom.id);
      setModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading || !student) return <Loader />;

  return (
    <div className="bg-white min-h-screen p-4">
      <img src={student.picture} alt={student.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-[#111827] text-center">{student.name}</h2>
      <p className="text-[#1F2937] text-center">{student.email}</p>
      <p className="text-[#1F2937] text-center">{student.category} - Semester {student.semester}</p>
      <p className="text-[#1F2937] mt-2">{student.bio}</p>
      <div className="flex justify-center mt-4">
        <button onClick={handleMessage} className="bg-[#1E3D99] text-white px-4 py-2 rounded mr-2">Message</button>
        {user.id === student.id && (
          <button onClick={() => navigate('/edit-profile')} className="bg-[#1E3D99] text-white px-4 py-2 rounded">Edit</button>
        )}
      </div>
      <h3 className="text-xl font-bold text-[#111827] mt-6">Projects</h3>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {student.projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <MessagingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} chatRoomId={chatRoomId} />
    </div>
  );
};

export default ProfilePage;