import React, { useState } from 'react';
import useMessaging from '../../hooks/useMessaging';
import { formatDate } from '../../utils/formatters';
import useAuth  from '../../hooks/useAuth';

const MessagingModal = ({ isOpen, onClose, chatRoomId }) => {
  const { messages, sendMessage } = useMessaging(chatRoomId);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleSend = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg w-96 h-96 flex flex-col">
        <div className="flex-1 overflow-y-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`mb-2 ${msg.sender_id === user.id ? 'text-right' : 'text-left'}`}
            >
              <p className="bg-[#F3F4F6] p-2 rounded inline-block">{msg.message_body}</p>
              <p className="text-xs text-[#1F2937]">{formatDate(msg.created_at)}</p>
            </div>
          ))}
        </div>
        <div className="flex mt-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border p-2 rounded-l"
          />
          <button onClick={handleSend} className="bg-[#1E3D99] text-white px-4 rounded-r">Send</button>
        </div>
        <button onClick={onClose} className="mt-2 text-[#EF4444]">Close</button>
      </div>
    </div>
  );
};

export default MessagingModal;