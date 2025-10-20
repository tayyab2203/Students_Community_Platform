


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);
  const [user, setUser] = useState(() => localStorage.getItem("user_email")); // 🔹 Check login state
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  // ✅ Updated nav items (added Teams, removed Logout)
  // const navItems = [
  //   { name: "Home", path: "/" },
  //   { name: "About", path: "/about" },
  //   { name: "Register", path: "/register" },
  // ];
  const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Register", path: "http://localhost:8000/register-student" }, // 🔹 Laravel Blade page
];


  const isActive = (path) => {
    if (!hasNavigated) return false;
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  // const handleNavigation = (path) => {
  //   setHasNavigated(true);
  //   navigate(path);
  //   setIsMobileMenuOpen(false);
  // };
  const handleNavigation = (path) => {
  setHasNavigated(true);

  // Agar path http se start ho raha hai, Laravel Blade page hai
  if (path.startsWith("http")) {
    window.location.href = path;
  } else {
    navigate(path);
  }

  setIsMobileMenuOpen(false);
};


  const handleLogoClick = () => {
    setHasNavigated(true);
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("auth_token");
    setUser(null);
    setShowDropdown(false);
    navigate("/");
  };

  return (
    <>
      {/* Background Particles (unchanged) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div
          className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-48 -right-48 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute w-64 h-64 bg-blue-400/10 rounded-full blur-2xl top-1/2 left-1/4 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative backdrop-blur-xl ${scrolled ? "bg-blue-50/30" : "bg-blue-100/20"
              } border border-blue-200/30 rounded-2xl shadow-2xl transition-all duration-500`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-blue-100/5 to-blue-600/10 rounded-2xl"></div>

            <div className="relative px-6 py-3 flex items-center justify-between">
              {/* Logo Section */}
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
                  <h3
                    className={`font-semibold text-sm leading-tight ${scrolled ? "text-blue-600" : "text-white"
                      }`}
                  >
                    Skills Network
                  </h3>
                  <p
                    className={`text-xs hidden sm:block ${scrolled ? "text-gray-500" : "text-gray-200"
                      }`}
                  >
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
                    className={`relative px-5 py-2 font-medium transition-all duration-300 group ${isActive(item.path)
                        ? scrolled
                          ? "text-gray-900"
                          : "text-white"
                        : scrolled
                          ? "text-gray-700 hover:text-gray-900"
                          : "text-white/80 hover:text-white"
                      }`}
                  >
                    <span className="relative z-10">{item.name}</span>
                    <div
                      className={`absolute inset-0 ${scrolled ? "bg-blue-100/50" : "bg-blue-50/50"
                        } rounded-lg transition-opacity duration-300 ${isActive(item.path)
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-100"
                        }`}
                    ></div>
                  </button>
                ))}
              </div>

              {/* Right Side: Profile Avatar + Dropdown */}
              <div className="flex items-center space-x-4 z-10">
                {/* Profile Avatar */}
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-blue-300 hover:scale-110 transition-transform"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=${user}&background=1E3D9D&color=fff`}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {/* Dropdown (Slide from Right) */}
                  <div
                    className={`absolute right-0 mt-3 w-40 bg-white/90 backdrop-blur-lg border border-gray-200/50 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 ease-out origin-top-right ${showDropdown
                        ? "opacity-100 translate-x-0 scale-100"
                        : "opacity-0 translate-x-5 scale-95 pointer-events-none"
                      }`}
                  >
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Profile
                    </button>
                    <button
                      onClick={() => navigate("/settings")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                </div>

                {/* Hamburger Menu (for mobile sidebar) */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`lg:hidden relative w-10 h-10 flex items-center justify-center backdrop-blur-sm border rounded-lg transition-all ${scrolled
                      ? "bg-white/20 border-gray-300/50"
                      : "bg-white/10 border-white/20"
                    }`}
                  aria-label="Toggle menu"
                >
                  <div className="w-5 h-4 flex flex-col justify-between">
                    <span
                      className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                        } ${scrolled ? "bg-gray-700" : "bg-white"}`}
                    ></span>
                    <span
                      className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : ""
                        } ${scrolled ? "bg-gray-700" : "bg-white"}`}
                    ></span>
                    <span
                      className={`w-full h-0.5 rounded-full transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                        } ${scrolled ? "bg-gray-700" : "bg-white"}`}
                    ></span>
                  </div>
                </button>
              </div>
            </div>

            {/* ✅ Mobile Sidebar / Menu */}
            {isMobileMenuOpen && (
              <div className="lg:hidden px-6 pb-5 animate-fadeIn">
                <div className="flex flex-col space-y-2 mt-3">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.path)}
                      className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-all ${isActive(item.path)
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-800 hover:bg-blue-50"
                        }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>

                {/* ✅ Reuse same dropdown in mobile */}
                <div className="mt-4 border-t border-gray-200/50 pt-3">
                  <button
                    onClick={() => navigate("/profile")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => navigate("/settings")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Settings
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );


};

export default Navbar;



// export default Navbar;
