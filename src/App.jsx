import React, { createContext, useContext, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import apiClient from "./services/apiClient";

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
  const [loading, setLoading] = useState(true);

  // ✅ Google Login Handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  // ✅ Load user on app start
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("auth_token");
      const storedUser = localStorage.getItem("user");

      if (token) {
        if (storedUser) {
          // Use cached user
          setUser(JSON.parse(storedUser));
        } else {
          // Fetch fresh user data
          try {
            const response = await apiClient.get("/user");
            const userData = response.data;
            
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("user_email", userData.email);
            setUser(userData);
            
            console.log("✅ User fetched on mount:", userData);
          } catch (error) {
            console.error("❌ Failed to fetch user:", error);
            
            // If API fails but we have email, use fallback
            const email = localStorage.getItem("user_email");
            if (email) {
              const fallbackUser = {
                id: null,
                name: email.split("@")[0],
                email: email,
              };
              setUser(fallbackUser);
            } else {
              // Token invalid, clear it
              localStorage.removeItem("auth_token");
            }
          }
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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