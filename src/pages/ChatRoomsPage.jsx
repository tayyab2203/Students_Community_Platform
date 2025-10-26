// import React, { useState, useEffect } from 'react';
// import messagingService from '../services/messagingService';
// import ChatRoomCard from '../components/cards/ChatRoomCard';

// const ChatRoomsPage = () => {
//   const [chatRooms, setChatRooms] = useState([]);

//   useEffect(() => {
//     messagingService.getChatRooms()
//       .then(setChatRooms)
//       .catch(console.error);
//   }, []);

//   return (
//     <div className="bg-white min-h-screen p-4">
//       <h1 className="text-2xl font-bold text-[#111827] mb-4">Chat Rooms</h1>
//       {chatRooms.map((room) => (
//         <ChatRoomCard key={room.id} room={room} />
//       ))}
//     </div>
//   );
// };

// export default ChatRoomsPage;

import React, { useState } from "react";
import MessagingModal from "../components/modals/MessagingModal";
import { useAuth } from "../hooks/useAuth"; // if you have one

export default function ChatRoomsPage() {
  const [activeRoom, setActiveRoom] = useState(null);
  const { user } = useAuth();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Chat Rooms</h2>
      <button onClick={() => setActiveRoom(1)}>Open Room #1</button>

      <MessagingModal
        isOpen={!!activeRoom}
        onClose={() => setActiveRoom(null)}
        chatRoomId={activeRoom}
        currentUser={user}
      />
    </div>
  );
}
