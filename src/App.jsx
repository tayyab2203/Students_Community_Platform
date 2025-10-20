import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Import pages
import Home from "./pages/Home";
import About from "./pages/About";
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

// ------------------- App Provider -------------------
const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Google Login Handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  // ✅ Load user token on app start
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    const email = localStorage.getItem("user_email");
    
    if (token) {
      setUser({
        id: 1,
        name: email ? email.split("@")[0] : "User",
        email: email || "user@example.com",
        image: "https://via.placeholder.com/40",
      });
    }
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser, handleGoogleLogin }}>
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
        <Route path="/about" element={<About />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/profile/:id/followers" element={<FollowersPage />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
      </Routes>
    </AppProvider>
  );
};

export default App;