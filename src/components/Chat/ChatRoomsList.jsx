// src/components/Chat/ChatRoomsList.jsx
import React from "react";
import { mockRooms } from "../../mock/chatData";

const ChatRoomsList = ({ onSelectRoom }) => {
  return (
    <div className="max-h-96 overflow-y-auto">
      {mockRooms.map((room) => {
        const otherUser = room.other_user;
        const lastMsg = room.last_message || "No messages yet";
        const time = room.last_timestamp ? new Date(room.last_timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
        return (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room)}
            className="flex items-center p-4 cursor-pointer hover:bg-gray-100 border-b"
          >
            <img src={otherUser.picture} alt={otherUser.name} className="w-10 h-10 rounded-full mr-3"/>
            <div className="flex-1">
              <p className="font-semibold">{otherUser.name}</p>
              <p className="text-gray-500 text-sm truncate">{lastMsg}</p>
            </div>
            <span className="text-xs text-gray-400 ml-2">{time}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChatRoomsList;
