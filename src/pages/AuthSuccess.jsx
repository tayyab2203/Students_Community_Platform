// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../App"; // Import context

// const AuthSuccess = () => {
//   const navigate = useNavigate();
//   const { setUser } = useAppContext(); // get setUser function

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const token = params.get("token");
//     const email = params.get("email"); // get email from URL

//     if (token) {
//       localStorage.setItem("auth_token", token);
//       localStorage.setItem("user_email", email);

//       // Set user in React context
//       setUser({
//         email,
//         name: email.split("@")[0],
//         image: "https://via.placeholder.com/40",
//       });

//       navigate("/", { replace: true });
//     } else {
//       navigate("/login", { replace: true });
//     }
//   }, [navigate, setUser]);

//   return (
//     <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-700 text-white">
//       <div className="text-center animate-pulse">
//         <h1 className="text-2xl font-semibold mb-2">Signing you in...</h1>
//         <p className="text-blue-200 text-sm">Please wait while we complete your login.</p>
//       </div>
//     </div>
//   );
// };

// export default AuthSuccess;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../App";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const email = params.get("email");

    if (token) {
      localStorage.setItem("auth_token", token);
      localStorage.setItem("user_email", email);

      setUser({
        email,
        name: email.split("@")[0],
        image: "https://via.placeholder.com/40",
      });

      // Small delay to make the UI feel smoother
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 2000);
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate, setUser]);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white text-center">
      <div className="max-w-md">
        <div className="animate-spin-slow inline-block mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-orange-400"
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
        <h1 className="text-2xl font-semibold mb-2">Authenticating...</h1>
        <p className="text-gray-400 mb-4">
          Grabbing your credentials from the cloud ☁️
        </p>
        <div className="bg-gray-800/60 px-6 py-3 rounded-lg border border-gray-700 text-sm font-mono text-gray-300">
          <p>&gt; Verifying your identity...</p>
          <p>&gt; Syncing your vibe 😎</p>
          <p>&gt; Almost there...</p>
        </div>
      </div>

      <footer className="mt-10 text-xs text-gray-500">
        <p>“Good things take a few seconds ⏳”</p>
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
        `}
      </style>
    </div>
  );
};

export default AuthSuccess;
