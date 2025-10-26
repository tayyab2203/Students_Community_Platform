import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppContext } from "../App";
import apiClient from "../services/apiClient";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get("token");
      const email = searchParams.get("email");

      if (!token) {
        navigate("/", { replace: true });
        return;
      }

      try {
        // ✅ Store token first
        localStorage.setItem("auth_token", token);
        if (email) {
          localStorage.setItem("user_email", email);
        }

        // ✅ Fetch complete user data from API
        const response = await apiClient.get("/user");
        const userData = response.data;

        // ✅ Store user object
        localStorage.setItem("user", JSON.stringify(userData));

        // ✅ Update context
        setUser(userData);

        console.log("✅ Login successful:", userData);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } catch (error) {
        console.error("❌ Failed to fetch user:", error);
        
        // Fallback: use email if API fails
        if (email) {
          const fallbackUser = {
            id: null,
            name: email.split("@")[0],
            email: email,
            image: "https://via.placeholder.com/40",
          };
          localStorage.setItem("user", JSON.stringify(fallbackUser));
          setUser(fallbackUser);
        }

        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } finally {
        setLoading(false);
      }
    };

    handleAuth();
  }, [navigate, setUser, searchParams]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#1E3D9D] via-[#132A70] to-[#0C1A4A] text-white text-center overflow-hidden relative">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/10 rounded-full animate-float"
            style={{
              width: Math.random() * 10 + 8 + "px",
              height: Math.random() * 10 + 8 + "px",
              left: Math.random() * 100 + "%",
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="z-10 max-w-md px-6 py-10 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg transform transition-all duration-700 hover:scale-105 hover:shadow-blue-500/30">
        {/* Loader Icon */}
        <div className="animate-spin-slow inline-block mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-14 w-14 text-white drop-shadow-lg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v2m0 12v2m8-8h-2M6 12H4m13.66 5.66l-1.42-1.42M6.76 6.76l-1.42-1.42m0 13.42l1.42-1.42M18.36 6.76l1.42-1.42"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold mb-2 animate-fade-in">
          {loading ? "Authenticating..." : "Success! ✅"}
        </h1>
        <p className="text-blue-100 mb-5 animate-fade-in-delayed">
          {loading 
            ? "Connecting you to CS STUDENTS COMMUNITY — almost there 😎"
            : "Redirecting to home..."}
        </p>

        <div className="bg-white/10 px-5 py-3 rounded-lg border border-white/20 text-sm font-mono text-blue-100 text-left transition-all duration-700 hover:bg-white/20">
          <p>&gt; Verifying credentials...</p>
          <p>&gt; {loading ? "Downloading good vibes ✨" : "Loading your profile ✨"}</p>
          <p>&gt; Preparing awesome STUDENTS COMMUNITY...</p>
        </div>
      </div>

      <footer className="z-10 mt-10 text-xs text-blue-200 animate-fade-in-delayed">
        "Good things take a few seconds ⏳"
      </footer>

      <style>
        {`
          .animate-spin-slow {
            animation: spin 3s linear infinite;
          }
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes float {
            0% { transform: translateY(0) scale(1); opacity: 0.5; }
            50% { transform: translateY(-50px) scale(1.2); opacity: 0.9; }
            100% { transform: translateY(0) scale(1); opacity: 0.5; }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fadeIn 1s ease-out forwards;
          }
          .animate-fade-in-delayed {
            animation: fadeIn 1.6s ease-out forwards;
            animation-delay: 0.4s;
          }
        `}
      </style>
    </div>
  );
};

export default AuthSuccess;