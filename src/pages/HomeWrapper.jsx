// src/pages/HomeWrapper.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Home from "./Home"; // your Home.jsx
import About from "./About";

const HomeWrapper = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token && email) {
      // ✅ Save token to localStorage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_email", email);

      // Remove query params from URL
      navigate("/", { replace: true });
    } else {
      // If no token, redirect to login
      navigate("/login");
    }
  }, [location, navigate]);

  return <Home />;
  return <About />;
};

export default HomeWrapper;
