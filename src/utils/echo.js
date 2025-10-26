// import Echo from "laravel-echo";
// import Pusher from "pusher-js";
// window.Pusher = Pusher;

// export const echo = new Echo({
//   broadcaster: "pusher",
//   key: process.env.REACT_APP_PUSHER_KEY,
//   cluster: process.env.REACT_APP_PUSHER_CLUSTER,
//   forceTLS: true,
//   encrypted: true,
//   auth: {
//     headers: {
//       Authorization: `Bearer ${localStorage.getItem('token')}`,
//     },
//   },
// });


// import Echo from "laravel-echo";
// import Pusher from "pusher-js";

// window.Pusher = Pusher;

// const echo = new Echo({
//   broadcaster: "pusher",
//   key: import.meta.env.VITE_PUSHER_KEY,
//   cluster: import.meta.env.VITE_PUSHER_CLUSTER,
//   forceTLS: true,
//   encrypted: true,
//   authEndpoint: `${(import.meta.env.VITE_API_URL || "")
//     .replace(/\/api\/?$/, "")}/broadcasting/auth`,
//   auth: { withCredentials: true },
  
// });

// export default echo;

import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: import.meta.env.VITE_PUSHER_KEY,
  cluster: import.meta.env.VITE_PUSHER_CLUSTER,
  forceTLS: true,
  encrypted: true,
  authEndpoint: `${(import.meta.env.VITE_API_URL || "http://localhost:8000")
    .replace(/\/api\/?$/, "")}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`, // ✅ Fixed
      Accept: 'application/json',
    },
  },
});

// ✅ Token update hone par echo reconnect
export const updateEchoAuth = () => {
  const token = localStorage.getItem('auth_token');
  if (echo.connector && echo.connector.pusher) {
    echo.connector.pusher.config.auth.headers.Authorization = `Bearer ${token}`;
  }
};

export default echo;