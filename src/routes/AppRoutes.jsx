// src/routes/AppRoutes.jsx
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Projects from '../pages/Projects/Projects';
import Blogs from '../pages/Blogs/Blogs';
import Services from '../pages/Services/Services';
import ContactConfirmation from '../pages/ContactConfirmation';
import Education from '../pages/Home/components/Education';
import Skills from '../pages/Home/components/Skills';
import AdminBlogs from '../pages/Blogs/AdminBlogs';
import AuthSuccess from "../pages/AuthSuccess";
import VerifyOtp from '../pages/VerifyOtp'; // IMPORT THIS
import HomeWrapper from "./pages/HomeWrapper";






const AppRoutes = () => {
  return (

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/services" element={<Services />} />
      <Route path="/ContactConfirmation" element={<ContactConfirmation />} />
      <Route path="/Education" element={<Education />} />
      <Route path="/Skills" element={<Skills />} />
      <Route path="/AdminBlogs" element={<AdminBlogs />} />
      {/* <Route path="/auth/success" element={<AuthSuccess />} /> */}
      <Route path="/auth/success/" element={<AuthSuccess />} />
      {/* <Route path="/verify-otp" element={<VerifyOtp />} /> ADD THIS */}
        // inside Routes
      <Route path="/home" element={<HomeWrapper />} />

    </Routes>

  );
};


export default AppRoutes;
