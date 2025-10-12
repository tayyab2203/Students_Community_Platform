import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MessageCircle,
  UserPlus,
  Eye,
} from "lucide-react";
import { useAppContext } from "../App";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// ------------------- Skill Badge Component -------------------
const SkillBadge = ({ skill, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-600/90 hover:bg-blue-500',
    green: 'bg-green-600/90 hover:bg-green-500',
    yellow: 'bg-yellow-600/90 hover:bg-yellow-500',
    purple: 'bg-purple-600/90 hover:bg-purple-500',
    orange: 'bg-orange-600/90 hover:bg-orange-500',
    red: 'bg-red-600/90 hover:bg-red-500',
    teal: 'bg-teal-600/90 hover:bg-teal-500'
  };

  return (
    <span className={`${colors[color] || colors.blue} text-white text-[10px] px-2 py-0.5 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-sm cursor-default`}>
      {skill}
    </span>
  );
};

// ------------------- Student Card Component -------------------
const StudentCard = ({ student, blurred = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const skillColors = ['blue', 'green', 'orange', 'purple', 'yellow', 'teal'];

  const handleViewProfile = () => {
    navigate(`/profile/${student.id}`);
  };

  return (
    <div
      className={`group bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-gray-700 hover:border-blue-500/50 ${blurred ? 'blur-sm' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: blurred ? 'none' : 'fadeInUp 0.6s ease-out forwards',
        opacity: blurred ? 0.3 : 1
      }}
    >
      {/* Student Image */}
      <div className="relative aspect-square bg-gray-700 overflow-hidden">
        {student.image ? (
          <img
            src={student.image}
            alt={student.name}
            className={`absolute inset-0 w-full h-full object-contain transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">{student.name.charAt(0)}</span>
          </div>
        )}
        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-60' : 'opacity-40'}`}></div>

        {student.available && (
          <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 animate-pulse">
            Available
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 truncate group-hover:text-blue-400 transition-colors duration-300">
          {student.name}
        </h3>
        <p className="text-gray-400 text-xs mb-2 sm:mb-3">{student.semester}</p>

        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 min-h-[24px] sm:min-h-[28px]">
          {student.skills.slice(0, 3).map((skill, idx) => (
            <SkillBadge key={idx} skill={skill} color={skillColors[idx % skillColors.length]} />
          ))}
          {student.skills.length > 3 && (
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
              +{student.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-gray-400 text-xs mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <span className="text-blue-400">👥</span> {student.followers}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-purple-400">📊</span> {student.following}
          </span>
        </div>

        <div className="flex gap-1 sm:gap-2">
          <button
            onClick={handleViewProfile}
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-1.5 sm:py-2 px-2 sm:px-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center justify-center gap-1 text-xs sm:text-sm font-medium shadow-md hover:shadow-lg transform hover:scale-105"
          >
            <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>View</span>
          </button>
          <button className="bg-gray-700 text-white p-1.5 sm:p-2 rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          <button className="bg-gray-700 text-white p-1.5 sm:p-2 rounded-lg hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-110">
            <UserPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Shine Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-1000 ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}></div>
    </div>
  );
};

// ------------------- Hero Section Component -------------------
const HeroSection = () => {
  const { handleGoogleLogin } = useAppContext();

  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900   to-blue-800 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl mt-10 sm:mt-9 sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 animate-fade-in">
          Connect with CS Students at BZU
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-blue-200 mb-6 sm:mb-8">
          Find collaborators, build teams, share skills
        </p>

        <div className="max-w-2xl mx-auto mb-6 sm:mb-8">
          <div className="relative group backdrop-blur-xl bg-white/5 border border-white/10 rounded-full overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-300">
            <input
              type="text"
              placeholder="Search by skills..."
              className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-transparent text-white text-base sm:text-lg placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 border-0"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600/80 backdrop-blur-sm text-white p-2 sm:p-3 rounded-full hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-110 border border-white/20">
              <Search className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button className="bg-white text-blue-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base">
            Browse Frontend Developers
          </button>
          <button className="bg-white text-blue-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium hover:bg-blue-50 transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base">
            Browse Backend Developers
          </button>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center space-x-2 bg-white text-gray-800 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full mx-auto font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto max-w-sm"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          <span className="text-sm sm:text-base">Sign in with Google to get started</span>
        </button>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

// ------------------- Featured Profiles Section -------------------
const FeaturedProfiles = () => {
  const { students, handleGoogleLogin } = useAppContext();

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">Featured Student Profiles</h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Discover talented students from BZU's Computer Science department</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-12">
          {students.map((student, index) => (
            <div
              key={student.id}
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <StudentCard student={student} />
            </div>
          ))}
        </div>

        {/* Blurred Section with Login Prompt */}
        <div className="relative mt-8 sm:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5">
            {students.slice(0, 5).map(student => (
              <StudentCard key={`blurred-${student.id}`} student={student} blurred={true} />
            ))}
          </div>

          <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 rounded-2xl p-4 sm:p-6 lg:p-8 text-center max-w-sm sm:max-w-md shadow-2xl border border-blue-700/50 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300">
              <div className="mb-3 sm:mb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-bold mb-2 sm:mb-3">Want to see more profiles?</h3>
              <p className="text-blue-200 text-xs sm:text-sm lg:text-base mb-4 sm:mb-6">Sign in with Google to connect with more students and unlock all features.</p>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-2 bg-white text-gray-800 px-4 sm:px-5 lg:px-6 py-2 sm:py-2.5 lg:py-3 rounded-full mx-auto font-medium hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto text-xs sm:text-sm"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span className="text-xs sm:text-sm lg:text-base">Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// ------------------- Home Page Component -------------------
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturedProfiles />
      <Footer />
    </>
  );
};

export default Home;