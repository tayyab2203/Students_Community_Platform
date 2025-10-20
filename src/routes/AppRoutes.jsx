// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
// import Register from '../pages/Register';
import AuthSuccess from "../pages/AuthSuccess";
import VerifyOtp from '../pages/VerifyOtp'; // IMPORT THIS
import HomeWrapper from "./pages/HomeWrapper";






const AppRoutes = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      {/* <Route path="/auth/success" element={<AuthSuccess />} /> */}
      <Route path="/auth/success/" element={<AuthSuccess />} />
      {/* <Route path="/verify-otp" element={<VerifyOtp />} /> ADD THIS */}
        // inside Routes
      <Route path="/home" element={<HomeWrapper />} />

    </Routes>

  );
};

export default AppRoutes;