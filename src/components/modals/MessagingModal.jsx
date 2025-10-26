// import React, { useState } from 'react';
// import useMessaging from '../../hooks/useMessaging';
// import { formatDate } from '../../utils/formatters';
// import useAuth  from '../../hooks/useAuth';

// const MessagingModal = ({ isOpen, onClose, chatRoomId }) => {
//   const { messages, sendMessage } = useMessaging(chatRoomId);
//   const [message, setMessage] = useState('');
//   const { user } = useAuth();

//   if (!isOpen) return null;

//   const handleSend = () => {
//     if (message.trim()) {
//       sendMessage(message);
//       setMessage('');
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
//       <div className="bg-white p-4 rounded-lg w-96 h-96 flex flex-col">
//         <div className="flex-1 overflow-y-auto">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`mb-2 ${msg.sender_id === user.id ? 'text-right' : 'text-left'}`}
//             >
//               <p className="bg-[#F3F4F6] p-2 rounded inline-block">{msg.message_body}</p>
//               <p className="text-xs text-[#1F2937]">{formatDate(msg.created_at)}</p>
//             </div>
//           ))}
//         </div>
//         <div className="flex mt-2">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 border p-2 rounded-l"
//           />
//           <button onClick={handleSend} className="bg-[#1E3D99] text-white px-4 rounded-r">Send</button>
//         </div>
//         <button onClick={onClose} className="mt-2 text-[#EF4444]">Close</button>
//       </div>
//     </div>
//   );
// };

// export default MessagingModal;

import React, { useEffect, useState, useRef } from "react";
import api from "../../services/apiClient";
import {
  getMessages,
  sendMessage,
  sendTyping,
  markMultipleRead,
} from "../../services/messagingService";
import useMessaging from "../../hooks/useMessaging";

export default function MessagingModal({ isOpen, onClose, chatRoomId, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [typingUsers, setTypingUsers] = useState({});
  const [isSending, setIsSending] = useState(false);
  const typingTimeoutRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!isOpen || !chatRoomId) return;
    getMessages(chatRoomId).then((res) => {
      const data = res.data.data || res.data;
      setMessages(data);
      const unread = data
        .filter((m) => !m.is_read && m.sender_id !== currentUser.id)
        .map((m) => m.id);
      if (unread.length) markMultipleRead(unread);
    });
  }, [isOpen, chatRoomId]);

  useMessaging({
    chatRoomId,
    onMessage: (msg) => {
      setMessages((p) => [...p, msg]);
      scrollBottom();
    },
    onTyping: ({ userId, isTyping }) => {
      setTypingUsers((p) => ({ ...p, [userId]: isTyping }));
      if (isTyping)
        setTimeout(
          () => setTypingUsers((p) => ({ ...p, [userId]: false })),
          2500
        );
    },
    onRead: ({ messageId, readerId, readAt }) =>
      setMessages((p) =>
        p.map((m) => (m.id === messageId ? { ...m, is_read: true, read_at: readAt } : m))
      ),
  });

  const scrollBottom = () =>
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);

  const handleTyping = (e) => {
    setText(e.target.value);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    sendTyping(chatRoomId, true);
    typingTimeoutRef.current = setTimeout(
      () => sendTyping(chatRoomId, false),
      1000
    );
  };

  const handleSend = async () => {
    if (!text.trim()) return;
    setIsSending(true);
    try {
      await sendMessage({ chat_room_id: chatRoomId, body: text });
      setText("");
      await sendTyping(chatRoomId, false);
    } finally {
      setIsSending(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-auto h-[80vh] flex flex-col">
      <div className="p-3 border-b flex justify-between items-center">
        <h3 className="font-semibold">Chat</h3>
        <button onClick={onClose} className="text-gray-500 text-sm">✕</button>
      </div>

      <div className="flex-1 overflow-auto p-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`mb-3 ${m.sender_id === currentUser.id ? "text-right" : "text-left"}`}
          >
            <div
              className={`inline-block px-3 py-2 rounded ${
                m.sender_id === currentUser.id
                  ? "bg-[#1E3D99] text-white"
                  : "bg-gray-100"
              }`}
            >
              {m.body}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(m.created_at).toLocaleTimeString()}
              {m.sender_id === currentUser.id && (
                <span className="ml-2">{m.is_read ? "✓✓" : "✓"}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div className="p-3 border-t">
        <div className="text-sm text-gray-500 mb-1">
          {Object.keys(typingUsers).some(
            (id) => typingUsers[id] && id !== String(currentUser.id)
          )
            ? "Typing..."
            : null}
        </div>
        <div className="flex gap-2">
          <input
            className="flex-1 p-2 border rounded"
            placeholder="Type..."
            value={text}
            onChange={handleTyping}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={isSending}
            className="px-4 py-2 bg-[#1E3D99] text-white rounded"
          >
            {isSending ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
