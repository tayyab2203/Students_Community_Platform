import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App"; // Import context

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext(); // get setUser function

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email"); // get email from URL

    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_email", email);

      // Set user in React context
      setUser({
        email,
        name: email.split("@")[0],
        image: "https://via.placeholder.com/40",
      });

      navigate("/", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, setUser]);

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-white">
      <div className="text-center animate-pulse">
        <h1 className="text-2xl font-semibold mb-2">Signing you in...</h1>
        <p className="text-blue-200 text-sm">Please wait while we complete your login.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
