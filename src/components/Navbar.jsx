import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const handleGoogleLogin = () => {
  //   console.log("Google login clicked");
  // };
  const handleGoogleLogin = () => {
  window.location.href = "http://localhost:8000/auth/google";
};


  // Navigation items with their routes
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Messaging', path: '/messages' },
    { name: 'About', path: '/about' },
    { name: 'Logout', path: '/logout' }
  ];

  // Check if current route is active
  const isActive = (path) => {
    // Only show active state after user has clicked
    if (!hasNavigated) return false;
    
    // For home route, only match exact path
    if (path === '/') {
      return location.pathname === '/';
    }
    // For other routes, match if pathname starts with the path
    return location.pathname.startsWith(path);
  };

  // Handle navigation
  const handleNavigation = (path) => {
    setHasNavigated(true);
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  // Handle logo click
  const handleLogoClick = () => {
    setHasNavigated(true);
    navigate('/');
  };

  return (
    <>
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute w-64 h-64 bg-blue-400/10 rounded-full blur-2xl top-1/2 left-1/4 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`relative backdrop-blur-xl ${scrolled ? 'bg-blue-50/30' : 'bg-blue-100/20'} border border-blue-200/30 rounded-2xl shadow-2xl transition-all duration-500 ${scrolled ? 'shadow-xl' : 'shadow-2xl'}`}>
            {/* Enhanced Glassmorphic overlay with bluish tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-100/5 to-blue-600/10 rounded-2xl"></div>
            
            <div className="relative px-6 py-3 flex items-center justify-between">
              {/* Logo Section - Clickable */}
              <div 
                onClick={handleLogoClick}
                className="flex items-center space-x-3 cursor-pointer group"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity duration-300"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 rounded-full flex items-center justify-center shadow-lg border border-white/20 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-white font-bold text-sm">BZU</span>
                  </div>
                </div>
                <div>
                  <h3 className={`font-semibold text-sm leading-tight group-hover:transition-colors duration-300 ${scrolled ? 'text-blue-600 group-hover:text-blue-300' : 'text-white group-hover:text-blue-300'}`}>
                    Skills Network
                  </h3>
                  <p className={`text-xs hidden sm:block transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-gray-200'}`}>
                    Student Community
                  </p>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-1 absolute left-1/2 transform -translate-x-1/2">
                {navItems.map((item) => (
                  <button 
                    key={item.name}
                    onClick={() => handleNavigation(item.path)}
                    className={`relative px-5 py-2 font-medium transition-all duration-300 group ${
                      isActive(item.path) 
                        ? scrolled 
                          ? 'text-gray-900' 
                          : 'text-white' 
                        : scrolled 
                          ? 'text-gray-700 hover:text-gray-900' 
                          : 'text-white/80 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div className={`absolute inset-0 ${scrolled ? 'bg-blue-100/50' : 'bg-blue-50/50'} rounded-lg transition-opacity duration-300 ${
                      isActive(item.path) 
                        ? 'opacity-100' 
                        : 'opacity-0 group-hover:opacity-100'
                    }`}></div>
                    <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 rounded-full transition-all duration-300 ${
                      isActive(item.path) 
                        ? 'w-4/5' 
                        : 'w-0 group-hover:w-4/5'
                    }`}></div>
                  </button>
                ))}
              </div>

              {/* Google Login Button */}
              <div className="flex items-center space-x-4 z-10">
                <button 
                  onClick={handleGoogleLogin}
                  className="relative group overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center space-x-3 bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-2.5 rounded-xl border border-white/20 shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-white font-semibold hidden sm:block">Login with Google</span>
                  </div>
                </button>

                {/* Hamburger Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`lg:hidden relative w-10 h-10 flex items-center justify-center backdrop-blur-sm border rounded-lg hover:transition-all duration-300 ${scrolled ? 'bg-white/20 border-gray-300/50' : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`}></span>
                    <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`}></span>
                    <span className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''} ${scrolled ? 'bg-gray-700' : 'bg-white'}`}></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Menu */}
      <div className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className={`absolute top-0 left-0 bottom-0 w-80 max-w-[85vw] transition-transform duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="h-full bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-2xl border-r border-white/10 shadow-2xl overflow-y-auto">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600"></div>
            
            {/* Profile Section in Sidebar - Clickable */}
            <div 
              onClick={handleLogoClick}
              className="p-6 border-b border-white/10 cursor-pointer group"
            >
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 rounded-full blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative w-14 h-14 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 group-hover:scale-105 transition-transform duration-300">
                    <span className="text-white font-bold text-xl">BZU</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-white font-bold text-base group-hover:text-blue-300 transition-colors duration-300">Skills Network</h3>
                  <p className="text-gray-400 text-sm">Student Community</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="py-6 px-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full group flex items-center space-x-4 px-6 py-4 transition-all duration-300 relative overflow-hidden rounded-xl mb-2 ${
                    isActive(item.path)
                      ? 'text-white bg-gradient-to-r from-blue-600/30 to-blue-700/30'
                      : 'text-white/80 hover:text-white'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/0 to-blue-700/0 transition-all duration-300 ${
                    isActive(item.path)
                      ? 'from-blue-600/30 to-blue-700/30'
                      : 'group-hover:from-blue-600/20 group-hover:to-blue-700/20'
                  }`}></div>
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-transform duration-300 ${
                    isActive(item.path)
                      ? 'scale-150'
                      : 'group-hover:scale-150'
                  }`}></div>
                  <span className="relative font-medium text-lg">{item.name}</span>
                  {isActive(item.path) && (
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Login Button */}
            <div className="px-8 py-6 border-t border-white/10">
              <button 
                onClick={handleGoogleLogin}
                className="w-full relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-700 to-blue-900 px-6 py-3.5 rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 border border-white/20">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="text-white font-semibold">Login with Google</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;