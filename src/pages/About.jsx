import React, { useState, useEffect } from 'react';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const About = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [currentTeamSlide, setCurrentTeamSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTeamSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 4));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: '🔐',
      title: 'Secure Authentication',
      description: 'Login exclusively with your @bzu.edu.pk Google account. Only verified BZU students can join our platform.',
      gradient: 'from-blue-500 to-indigo-600'
    },
    {
      icon: '👤',
      title: 'Detailed Profiles',
      description: 'Create comprehensive profiles showcasing your skills, experience levels, projects, and availability for collaboration.',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      icon: '🔍',
      title: 'Advanced Search',
      description: 'Find students by specific skills, semester, experience level, and availability status using powerful search filters.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: '💬',
      title: 'Real-time Messaging',
      description: 'Connect instantly with other students through our real-time chat system with typing indicators and read receipts.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: '👥',
      title: 'Follow System',
      description: 'Follow students to stay updated with their latest skills, projects, and activities on the platform.',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      icon: '🔔',
      title: 'Notifications',
      description: 'Get instant notifications when someone follows you, sends a message, or when there\'s activity from followed users.',
      gradient: 'from-yellow-500 to-orange-600'
    }
  ];

  const howItWorks = [
    {
      icon: '1️⃣',
      title: 'Sign In with Google',
      description: 'Use your @bzu.edu.pk Google account to create your profile instantly and securely.'
    },
    {
      icon: '2️⃣',
      title: 'Complete Your Profile',
      description: 'Add your skills, experience levels, semester, and what you\'re working on or interested in.'
    },
    {
      icon: '3️⃣',
      title: 'Discover & Connect',
      description: 'Search for students with skills you need, follow interesting profiles, and start collaborating.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Active Students' },
    { number: '25+', label: 'Skill Categories' },
    { number: '100+', label: 'Active Collaborations' },
    { number: '1000+', label: 'Connections Made' }
  ];

  const teamMembers = [
    { name: 'Faizan Islam', role: 'Project Lead & Documentation', initials: 'FI', color: 'from-blue-600 to-indigo-700' },
    { name: 'Ahmed Khan', role: 'Frontend Developer', initials: 'AK', color: 'from-purple-600 to-pink-700' },
    { name: 'Sara Ali', role: 'Backend Developer', initials: 'SA', color: 'from-green-600 to-teal-700' },
    { name: 'Bilal Ahmed', role: 'UI/UX Designer', initials: 'BA', color: 'from-orange-600 to-red-700' },
    { name: 'Fatima Malik', role: 'Database Architect', initials: 'FM', color: 'from-cyan-600 to-blue-700' },
    { name: 'Hassan Raza', role: 'API Developer', initials: 'HR', color: 'from-yellow-600 to-orange-700' },
    { name: 'Ayesha Siddiqui', role: 'QA Engineer', initials: 'AS', color: 'from-pink-600 to-rose-700' },
    { name: 'Usman Tariq', role: 'DevOps Engineer', initials: 'UT', color: 'from-indigo-600 to-purple-700' },
    { name: 'Zainab Shah', role: 'Security Specialist', initials: 'ZS', color: 'from-teal-600 to-green-700' },
    { name: 'Ali Hassan', role: 'Full Stack Developer', initials: 'AH', color: 'from-red-600 to-pink-700' }
  ];

  const nextSlide = () => {
    setCurrentTeamSlide((prev) => (prev + 1) % Math.ceil(teamMembers.length / 4));
  };

  const prevSlide = () => {
    setCurrentTeamSlide((prev) => (prev - 1 + Math.ceil(teamMembers.length / 4)) % Math.ceil(teamMembers.length / 4));
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      
      {/* Hero Section with Animation */}
      <section className="relative bg-gradient-to-br from-[#1E3E9E] via-[#2d5ac9] to-[#1E3E9E] text-white pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-fadeIn leading-tight">
            About BZU Student Skills Platform
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl opacity-95 animate-fadeIn leading-relaxed" style={{animationDelay: '0.2s'}}>
            Empowering Computer Science students at Bahauddin Zakariya University to connect, collaborate, and grow together
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <button className="bg-white text-[#1E3E9E] px-8 py-3 rounded-full font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300">
              Get Started
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#1E3E9E] transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#1E3E9E] font-semibold text-sm uppercase tracking-wider">Our Purpose</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Our Mission</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] mx-auto rounded-full"></div>
          </div>
          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
            The BZU Student Skills Platform is designed to bridge the gap between talented CS students at Bahauddin Zakariya University. 
            Our mission is to create a vibrant ecosystem where students can showcase their technical skills, discover like-minded collaborators, 
            and build meaningful connections that extend beyond the classroom.
          </p>
        </section>

        {/* Features Section with Enhanced Animation */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#1E3E9E] font-semibold text-sm uppercase tracking-wider">What We Offer</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Platform Features</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden"
                onMouseEnter={() => setHoveredCard(`feature-${index}`)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-4xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1E3E9E] transition-colors duration-300">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section with Counter Animation */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-[#1E3E9E] via-[#2d5ac9] to-[#1E3E9E] text-white py-16 px-6 sm:px-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
            </div>
            <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center transform hover:scale-110 transition-all duration-300">
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3">{stat.number}</div>
                  <div className="text-base sm:text-lg opacity-90 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#1E3E9E] font-semibold text-sm uppercase tracking-wider">Getting Started</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">How It Works</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-1/2 left-1/3 w-1/3 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] -translate-y-1/2 z-0"></div>
            <div className="hidden md:block absolute top-1/2 right-1/3 w-1/3 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] -translate-y-1/2 z-0"></div>
            {howItWorks.map((step, index) => (
              <div
                key={index}
                className="relative z-10 bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-[#1E3E9E] to-[#2d5ac9] rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto shadow-xl">
                  {step.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 text-center">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed text-center">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* University Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#1E3E9E] font-semibold text-sm uppercase tracking-wider">Our Institution</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">About Bahauddin Zakariya University</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] mx-auto rounded-full"></div>
          </div>
          <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="w-48 h-48 bg-gradient-to-br from-[#1E3E9E] to-[#2d5ac9] rounded-full flex items-center justify-center text-white text-6xl font-bold shadow-2xl animate-pulse">
                  BZU
                </div>
              </div>
              <div>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Bahauddin Zakariya University is a premier educational institution in Pakistan, known for its excellence 
                  in Computer Science and Technology education. Our CS department produces talented graduates who go on 
                  to make significant contributions in the tech industry.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  This platform is built by students, for students, 
                  to strengthen our academic community and foster innovation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Slider Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <span className="text-[#1E3E9E] font-semibold text-sm uppercase tracking-wider">Meet The Team</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">Our Development Team</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#1E3E9E] to-[#2d5ac9] mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600 text-lg">Built by a dedicated team of 10 CS students as part of our final year project</p>
          </div>
          
          <div className="relative">
            {/* Desktop View - 4 cards */}
            <div className="hidden lg:block overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentTeamSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="min-w-full grid grid-cols-4 gap-6 px-2">
                    {teamMembers.slice(slideIndex * 4, slideIndex * 4 + 4).map((member, index) => (
                      <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                        <div className={`w-28 h-28 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-xl hover:scale-110 transition-all duration-300`}>
                          {member.initials}
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1 text-center">{member.name}</h4>
                        <p className="text-gray-600 text-sm text-center">{member.role}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Tablet View - 2 cards */}
            <div className="hidden md:block lg:hidden overflow-hidden">
              <div className="grid grid-cols-2 gap-6">
                {teamMembers.slice(0, 4).map((member, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                    <div className={`w-28 h-28 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-xl hover:scale-110 transition-all duration-300`}>
                      {member.initials}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1 text-center">{member.name}</h4>
                    <p className="text-gray-600 text-sm text-center">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View - 1 card */}
            <div className="md:hidden overflow-hidden">
              <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
                {teamMembers.slice(0, 3).map((member, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                    <div className={`w-28 h-28 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4 shadow-xl hover:scale-110 transition-all duration-300`}>
                      {member.initials}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1 text-center">{member.name}</h4>
                    <p className="text-gray-600 text-sm text-center">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Desktop Only */}
            <div className="hidden lg:flex justify-center items-center gap-4 mt-8">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 bg-white border-2 border-[#1E3E9E] text-[#1E3E9E] rounded-full flex items-center justify-center hover:bg-[#1E3E9E] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-bold"
              >
                ←
              </button>
              <div className="flex gap-2">
                {Array.from({ length: Math.ceil(teamMembers.length / 4) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTeamSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentTeamSlide === index ? 'w-8 bg-[#1E3E9E]' : 'w-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 bg-white border-2 border-[#1E3E9E] text-[#1E3E9E] rounded-full flex items-center justify-center hover:bg-[#1E3E9E] hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl text-xl font-bold"
              >
                →
              </button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-20">
          <div className="bg-gradient-to-br from-gray-100 to-blue-50 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-200">
            <div className="text-center mb-8">
              <h3 className="text-3xl sm:text-4xl font-bold text-[#1E3E9E] mb-4">Get In Touch</h3>
              <p className="text-gray-700 text-lg">Have questions or feedback? We'd love to hear from you!</p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8">
              <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-3xl">📧</span>
                <span className="text-gray-700 font-medium">support@bzuskills.edu.pk</span>
              </div>
              <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <span className="text-3xl">🏛</span>
                <span className="text-gray-700 font-medium">CS Department, BZU Multan</span>
              </div>
            </div>
          </div>
        </section>
        
      </div>
      

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
    <Footer />
    </>
  );
};

export default About;