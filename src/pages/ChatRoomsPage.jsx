import React, { useState, useEffect } from 'react';
import messagingService from '../services/messagingService';
import ChatRoomCard from '../components/cards/ChatRoomCard';

const ChatRoomsPage = () => {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    messagingService.getChatRooms()
      .then(setChatRooms)
      .catch(console.error);
  }, []);

  return (
    <div className="bg-white min-h-screen p-4">
      <h1 className="text-2xl font-bold text-[#111827] mb-4">Chat Rooms</h1>
      {chatRooms.map((room) => (
        <ChatRoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default ChatRoomsPage;