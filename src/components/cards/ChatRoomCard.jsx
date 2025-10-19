import React, { useState } from 'react';
import MessagingModal from '../modals/MessagingModal';

const ChatRoomCard = ({ room }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Assume room has other_user details fetched in parent or via service
  const otherUserName = room.other_user?.name || 'User';

  return (
    <div className="bg-[#F3F4F6] p-4 rounded-lg shadow-md mb-4 cursor-pointer" onClick={() => setModalOpen(true)}>
      <h3 className="text-xl font-bold text-[#111827]">{otherUserName}</h3>
      <p className="text-[#1F2937]">Last message: {room.last_message || 'No messages yet'}</p>
      <p className="text-xs text-[#1F2937]">{room.last_timestamp ? formatDate(room.last_timestamp) : ''}</p>
      <MessagingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} chatRoomId={room.id} />
    </div>
  );
};

export default ChatRoomCard;