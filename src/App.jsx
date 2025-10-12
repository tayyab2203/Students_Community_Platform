import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import FollowersPage from "./pages/FollowersPage";
import AuthSuccess from "./pages/AuthSuccess";


// ------------------- Context Setup -------------------
const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};

// ------------------- Mock Data -------------------
const mockStudents = [
  {
    id: 1,
    name: "Faizan Islam",
    semester: "Semester 7",
    skills: ["React", "Node.js", "TypeScript"],
    followers: 45,
    following: 32,
    available: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
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
    name: "Tayyab Sajjad",
    semester: "Semester 7",
    skills: ["UI/UX", "Figma", "JavaScript"],
    followers: 52,
    following: 19,
    available: true,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
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
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
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
    image: "src/assets/images/Irfan.png",
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

// ------------------- App Provider -------------------
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState(mockStudents);

  // const handleGoogleLogin = () => {
  //   alert("Google login simulated!");
  // };
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  // ---------- NEW: Load token on app start ----------
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const email = localStorage.getItem("user_email"); // optional: store email in AuthSuccess
    if (token) {
      setUser({
        id: 1,
        name: email ? email.split("@")[0] : "User",
        email: email || "user@example.com",
        image: "https://via.placeholder.com/40", // placeholder profile image
      });
    }
  }, []);


  return (
    <AppContext.Provider value={{ user, setUser, students, handleGoogleLogin }}>
      {children}
    </AppContext.Provider>
  );
};

// ------------------- App Component -------------------
const App = () => {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/followers" element={<FollowersPage />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </AppProvider>
  );
};

export default App;