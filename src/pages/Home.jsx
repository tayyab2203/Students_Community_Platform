import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MessageCircle, UserPlus, Eye } from "lucide-react";
import { useAppContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SearchFilterBar from "../components/forms/SearchFilterBar";
import useSearch from "../hooks/useSearch";
import { getStudents } from '../services/studentService.js';

// ------------------- Skill Badge Component -------------------
const SkillBadge = ({ skill, color = "blue" }) => {
  const colors = {
    blue: "bg-blue-600/90 hover:bg-blue-500",
    green: "bg-green-600/90 hover:bg-green-500",
    yellow: "bg-yellow-600/90 hover:bg-yellow-500",
    purple: "bg-purple-600/90 hover:bg-purple-500",
    orange: "bg-orange-600/90 hover:bg-orange-500",
    red: "bg-red-600/90 hover:bg-red-500",
    teal: "bg-teal-600/90 hover:bg-teal-500",
  };

  return (
    <span
      className={`${
        colors[color] || colors.blue
      } text-white text-[10px] px-2 py-0.5 rounded-full font-medium transition-all duration-300 hover:scale-105 shadow-sm cursor-default`}
    >
      {skill}
    </span>
  );
};

// ------------------- Student Card Component -------------------
const StudentCard = ({ student, blurred = false }) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = React.useState(false);
  const skillColors = ["blue", "green", "orange", "purple", "yellow", "teal"];

  const handleViewProfile = () => {
    navigate(`/profile/${student.id}`);
  };

  // Parse skills if they're stored as JSON string or comma-separated
  let safeSkills = [];
  if (Array.isArray(student.skills)) {
    safeSkills = student.skills;
  } else if (typeof student.skills === 'string') {
    try {
      // Try parsing as JSON first
      safeSkills = JSON.parse(student.skills);
    } catch {
      // If not JSON, split by comma
      safeSkills = student.skills.split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  const displaySkills = safeSkills.slice(0, 3);

  return (
    <div
      className={`group bg-gradient-to-br from-gray-800 via-gray-850 to-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 ease-out border border-gray-700 hover:border-blue-500/50 ${
        blurred ? "blur-sm" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: blurred ? "none" : "fadeInUp 0.6s ease-out forwards",
        opacity: blurred ? 0.3 : 1,
      }}
    >
      {/* Student Image */}
      <div className="relative aspect-square bg-gray-700 overflow-hidden">
        {student.picture || student.image ? (
          <img
            src={student.picture || student.image}
            alt={student.name || "Student"}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
              isHovered ? "scale-105" : "scale-100"
            }`}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700">
            <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
              {student.name?.charAt(0) || "S"}
            </span>
          </div>
        )}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent transition-opacity duration-500 ${
            isHovered ? "opacity-60" : "opacity-40"
          }`}
        ></div>

        {student.available && (
          <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90 animate-pulse">
            Available
          </span>
        )}
      </div>

      {/* Card Content */}
      <div className="p-3 sm:p-4">
        <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 truncate group-hover:text-blue-400 transition-colors duration-300">
          {student.name || "Unknown Student"}
        </h3>
        <p className="text-gray-400 text-xs mb-2 sm:mb-3">
          {student.semester || "N/A"}
        </p>

        <div className="flex flex-wrap gap-1 mb-2 sm:mb-3 min-h-[24px] sm:min-h-[28px]">
          {displaySkills.map((skill, idx) => (
            <SkillBadge
              key={idx}
              skill={skill}
              color={skillColors[idx % skillColors.length]}
            />
          ))}
          {safeSkills.length > 3 && (
            <span className="bg-gray-700 text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
              +{safeSkills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between text-gray-400 text-xs mb-2 sm:mb-3">
          <span className="flex items-center gap-1">
            <span className="text-blue-400">👥</span> {student.followers || 0}
          </span>
          <span className="flex items-center gap-1">
            <span className="text-purple-400">📊</span> {student.following || 0}
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

      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transform -skew-x-12 transition-all duration-1000 ${
          isHovered ? "translate-x-full" : "-translate-x-full"
        }`}
      ></div>
    </div>
  );
};

// ------------------- Hero Section Component -------------------
const HeroSection = () => {
  const { handleGoogleLogin } = useAppContext();

  return (
    <div className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
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
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

// ------------------- Featured Profiles Section -------------------
const FeaturedProfiles = ({ students = [], loading = false }) => {
  const safeStudents = Array.isArray(students) ? students : [];

  if (loading) {
    return (
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mt-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-gray-300 rounded-2xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (safeStudents.length === 0) {
    return (
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            No Students Found
          </h2>
          <p className="text-gray-600">Be the first to register and showcase your profile!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Featured Student Profiles
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm lg:text-base">
            Discover talented students from BZU's Computer Science department
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-8 sm:mb-12">
          {safeStudents.map((student, index) => (
            <div
              key={student.id || index}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <StudentCard student={student} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

// ------------------- Home Page Component -------------------
const Home = () => {
  const { results = [], loading: searchLoading, updateSearchQuery, updateCategory } = useSearch();
  
  const [apiStudents, setApiStudents] = useState([]);
  const [apiLoading, setApiLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const saved = localStorage.getItem('newStudent');
  if(saved){
    setApiStudents(prev => [JSON.parse(saved), ...prev]); // top pe add
    localStorage.removeItem('newStudent'); // cleanup
  }
}, []);


  // ✅ Fetch dynamic students from Laravel API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setApiLoading(true);
        const data = await getStudents();
        console.log('API Response:', data); // Debug log
        setApiStudents(data.data || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError("Failed to load students. Please try again later.");
      } finally {
        setApiLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // ✅ Display search results if available, otherwise show all API students
  const displayStudents = results.length > 0 ? results : apiStudents;
  const isLoading = apiLoading || searchLoading;

  return (
    <>
      <Navbar />
      <HeroSection />

      <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
        <SearchFilterBar onSearch={updateSearchQuery} onFilterChange={updateCategory} />
      </div>

      {error && (
        <div className="text-center text-red-600 py-6 bg-red-50 mx-4 rounded-lg">
          {error}
        </div>
      )}

      <FeaturedProfiles students={displayStudents} loading={isLoading} />

      <Footer />
    </>
  );
};

export default Home;