// App.jsx
import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import {
  Search,
  MessageCircle,
  UserPlus,
  Eye,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

import Profile from "./Profile"; 
import FollowersPage from "./FollowersPage";

// ✅ your new separate profile file

// ------------------- Context Setup -------------------
const AppContext = createContext();
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

const mockStudents = [
  {
    id: 1,
    name: "Faizan Islam",
    semester: "Semester 7",
    skills: ["React", "Node.js", "TypeScript"],
    followers: 45,
    following: 32,
    available: true,
    bio: "A passionate full-stack developer focusing on modern React and Node.js ecosystems.",
    projects: [
      { title: "Student Networking Platform", tech: "React, Node.js" },
      { title: "E-commerce Website", tech: "MERN Stack" },
    ],
    activity: [
      "Added new skill: TypeScript",
      "Updated E-commerce Website project",
    ],
  },
  {
    id: 2,
    name: "Muhammad Kamil",
    semester: "Semester 7",
    skills: ["Python", "Django", "AWS"],
    followers: 38,
    following: 24,
    available: true,
    bio: "Aspiring software engineer skilled in Python, Django, and AWS. Passionate about backend development, cloud deployment, and building impactful digital solutions.",
  projects: [
      { title: "Student Networking Platform", tech: "React, Node.js" },
      { title: "E-commerce Website", tech: "MERN Stack" },
    ],
    activity: [
      "Added new skill: TypeScript",
      "Updated E-commerce Website project",
    ],
  
  },
  {
    id: 3,
    name: "Tayyá Sajjad",
    semester: "Semester 7",
    skills: ["UI/UX", "Figma", "JavaScript"],
    followers: 52,
    following: 19,
    available: true,
    bio: "Creative UI/UX designer with a knack for crafting intuitive user experiences. Proficient in Figma and front-end technologies.",
  projects: [
      { title: "Student Networking Platform", tech: "React, Node.js" },
      { title: "E-commerce Website", tech: "MERN Stack" },
    ],
    activity: [
      "Added new skill: TypeScript",
      "Updated E-commerce Website project",
    ],
  },
  {
    id: 4,
    name: "Muhammad Naveed",
    semester: "Semester 7",
    skills: ["Java", "Spring", "SQL"],
    followers: 29,
    following: 35,
    available: true,
    bio: "Backend developer with expertise in Java, Spring Framework, and SQL databases. Focused on building robust and scalable server-side applications.",
  projects: [
      { title: "Student Networking Platform", tech: "React, Node.js" },
      { title: "E-commerce Website", tech: "MERN Stack" },
    ],
    activity: [
      "Added new skill: TypeScript",
      "Updated E-commerce Website project",
    ],
  },
  {
    id: 5,
    name: "Fazal Abbas",
    semester: "Semester 7",
    skills: ["Flutter", "Firebase", "Dart"],
    followers: 33,
    following: 28,
    available: true,
    bio: "Mobile app developer specializing in Flutter and Firebase. Passionate about creating cross-platform applications with seamless user experiences.",
  projects: [
      { title: "Student Networking Platform", tech: "React, Node.js" },
      { title: "E-commerce Website", tech: "MERN Stack" },
    ],
    activity: [
      "Added new skill: TypeScript",
      "Updated E-commerce Website project",
    ],  
  },
  {
    id: 6,
    name: "Muhammad Irfan",
    semester: "Semester 7",
    skills: ["DevOps", "Docker", "CI/CD"],
    followers: 41,
    following: 23,
    available: true,
    bio: "DevOps enthusiast with experience in Docker, CI/CD pipelines, and cloud infrastructure. Dedicated to optimizing development workflows and deployment processes.",
  projects: [
      { title: "Student Networking Platform", tech: "React, Node.js" },
      { title: "E-commerce Website", tech: "MERN Stack" },
    ],
    activity: [
      "Added new skill: TypeScript",
      "Updated E-commerce Website project",
    ],  
  },
];

const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState(mockStudents);

  const handleGoogleLogin = () => alert("Google login simulated!");

  return (
    <AppContext.Provider value={{ user, setUser, students, handleGoogleLogin }}>
      {children}
    </AppContext.Provider>
  );
};

// ------------------- Navbar, Hero, SkillBadge, StudentCard, FeaturedProfiles, Footer -------------------
// keep all of these components exactly as they are from your current file
const Navbar = () => {
  const { handleGoogleLogin } = useAppContext();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4">
  <div className="max-w-7xl mx-auto flex items-center justify-between">
    <div className="flex items-center space-x-8">
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">BZU</span>
        </div>
        <span className="text-blue-900 font-bold text-lg">Skills Network</span>
      </div>
    </div>
    
    {/* Centered Navigation Links */}
    <div className="hidden md:flex space-x-6 absolute left-1/2 transform -translate-x-1/2">
      <a href="#" className="text-gray-700 hover:text-blue-900 font-medium">Home</a>
      <a href="#" className="text-gray-700 hover:text-blue-900 font-medium">Register</a>
      <a href="#" className="text-gray-700 hover:text-blue-900 font-medium">Messages</a>
      <a href="#" className="text-gray-700 hover:text-blue-900 font-medium">About</a>
      <a href="#" className="text-gray-700 hover:text-blue-900 font-medium">Logout</a>
    </div>

    <button 
      onClick={handleGoogleLogin}
      className="flex items-center space-x-2 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      <span>Login with Google</span>
    </button>
  </div>
</nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  const { handleGoogleLogin } = useAppContext();

  return (
    <div className="bg-gradient-to-br from-blue-950 to-blue-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Connect with CS Students at BZU</h1>
        <p className="text-xl text-blue-200 mb-8">Find collaborators, build teams, share skills</p>
        
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by skills..."
              className="w-full px-6 py-4 rounded-full text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Browse Frontend Developers
          </button>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors">
            Browse Backend Developers
          </button>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center space-x-2 bg-white text-gray-800 px-6 py-3 rounded-full mx-auto font-medium hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Sign in with Google to get started</span>
        </button>
      </div>
    </div>
  );
};

// Skill Badge Component
const SkillBadge = ({ skill, color = 'blue' }) => {
  const colors = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    yellow: 'bg-yellow-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600',
    red: 'bg-red-600',
    teal: 'bg-teal-600'
  };

  return (
    <span className={`${colors[color] || colors.blue} text-white text-xs px-3 py-1 rounded-full font-medium`}>
      {skill}
    </span>
  );
};

// Student Card Component
const StudentCard = ({ student, blurred = false }) => {
  const navigate = useNavigate(); // ✅ initialize navigation
  const skillColors = ['blue', 'green', 'orange', 'purple', 'yellow', 'teal'];

  const handleViewProfile = () => {
    navigate(`/profile/${student.id}`); // ✅ navigate to profile page
  };

  return (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 ${blurred ? 'blur-sm' : ''}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-lg font-bold">{student.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{student.name}</h3>
            <p className="text-gray-400 text-sm">{student.semester}</p>
          </div>
        </div>
        {student.available && (
          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Available</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {student.skills.map((skill, idx) => (
          <SkillBadge key={idx} skill={skill} color={skillColors[idx % skillColors.length]} />
        ))}
      </div>

      <div className="flex items-center space-x-6 text-gray-400 text-sm mb-4">
        <span>Followers: {student.followers}</span>
        <span>Following: {student.following}</span>
      </div>

      {student.available && (
        <p className="text-green-400 text-sm mb-4">Available for collaboration</p>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleViewProfile} // ✅ this triggers navigation
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>View Profile</span>
        </button>
        <button className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors">
          <MessageCircle className="w-5 h-5" />
        </button>
        <button className="bg-gray-700 text-white p-2 rounded-lg hover:bg-gray-600 transition-colors">
          <UserPlus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Featured Profiles Section
const FeaturedProfiles = () => {
  const { students, handleGoogleLogin } = useAppContext();

  return (
    <div className="py-16 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Featured Student Profiles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {students.map(student => (
            <StudentCard key={student.id} student={student} />
          ))}
        </div>

        {/* Blurred Section with Login Prompt */}
        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.slice(0, 3).map(student => (
              <StudentCard key={`blurred-${student.id}`} student={student} blurred={true} />
            ))}
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-blue-900 rounded-xl p-8 text-center max-w-md shadow-2xl">
              <h3 className="text-white text-2xl font-bold mb-4">Want to see more profiles?</h3>
              <p className="text-blue-200 mb-6">Sign in with Google to connect with more students and unlock all features.</p>
              <button 
                onClick={handleGoogleLogin}
                className="flex items-center justify-center space-x-2 bg-white text-gray-800 px-6 py-3 rounded-full mx-auto font-medium hover:bg-gray-100 transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* BZU Student Network */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">BZU Student Network</h3>
          <p className="text-gray-400 mb-4">
            Connecting students based on skills and interests at Bahauddin Zakariya University.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Browse Students</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Skills Directory</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Projects</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Guidelines</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Support</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
          <p className="text-gray-400 mb-2">Bahauddin Zakariya University</p>
          <p className="text-gray-400 mb-2">Bosan Road, Multan</p>
          <p className="text-gray-400 mb-2">Punjab, Pakistan</p>
          <p className="text-gray-400 mb-2">Email: contact@bzustudents.edu.pk</p>
          <p className="text-gray-400">Phone: +92 61 9210071</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
        <p>© 2025 BZU Student Skills Network. All rights reserved.</p>
      </div>
    </footer>
  );
};

// ------------------- App -------------------
const App = () => (
  <Router>
    <AppProvider>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <FeaturedProfiles />
              <Footer />
            </>
          }
        />
        {/* ✅ Separate Profile Page */}
        <Route path="/Profile/:id" element={<Profile />} />
        <Route path="/profile/:id/followers" element={<FollowersPage />} />
      </Routes>
    </AppProvider>
  </Router>
);

export default App;
