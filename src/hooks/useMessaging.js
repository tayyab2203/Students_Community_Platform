// import { useState, useEffect } from 'react';
// import messagingService from '../services/messagingService';

// const useMessaging = (chatRoomId) => {
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     if (chatRoomId) {
//       messagingService.getMessages(chatRoomId)
//         .then(setMessages)
//         .catch(console.error);
//     }
//   }, [chatRoomId]);

//   const sendMessage = async (messageBody) => {
//     try {
//       const newMessage = await messagingService.sendMessage(chatRoomId, messageBody);
//       setMessages((prev) => [...prev, newMessage]);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return { messages, sendMessage };
// };

// export default useMessaging;

// import { useEffect, useRef } from "react";
// import echo from "../utils/echo";

// export default function useMessaging({ chatRoomId, onMessage, onTyping, onRead }) {
//   const channelRef = useRef(null);

//   useEffect(() => {
//     if (!chatRoomId) return;
//     const channelName = `chat.${chatRoomId}`;
//     channelRef.current = echo.private(channelName);

//     channelRef.current.listen("MessageSent", (payload) => onMessage?.(payload));
//     channelRef.current.listen("UserTyping", (payload) => onTyping?.(payload));
//     channelRef.current.listen("MessageRead", (payload) => onRead?.(payload));

//     return () => {
//       try {
//         echo.leave(channelName);
//       } catch {}
//     };
//   }, [chatRoomId]);
// }
import { useEffect, useRef, useCallback } from "react";
import echo from "../utils/echo";

/**
 * Custom hook for real-time messaging
 * @param {number} chatRoomId - The ID of the chat room or receiver
 * @param {Function} onMessage - Callback when new message arrives
 * @param {Function} onTyping - Callback when user is typing
 * @param {Function} onRead - Callback when message is read
 */
export default function useMessaging({ 
  chatRoomId, 
  onMessage, 
  onTyping, 
  onRead 
}) {
  const channelRef = useRef(null);

  useEffect(() => {
    if (!chatRoomId) return;

    const channelName = `private-chat.${chatRoomId}`;
    
    // Subscribe to channel
    channelRef.current = echo.private(channelName);

    // Listen for events
    if (onMessage) {
      channelRef.current.listen("MessageSent", (payload) => {
        console.log("📩 Message received:", payload);
        onMessage(payload);
      });
    }

    if (onTyping) {
      channelRef.current.listenForWhisper("typing", (payload) => {
        console.log("⌨️ User typing:", payload);
        onTyping(payload);
      });
    }

    if (onRead) {
      channelRef.current.listen("MessageRead", (payload) => {
        console.log("✅ Message read:", payload);
        onRead(payload);
      });
    }

    // Cleanup
    return () => {
      if (channelRef.current) {
        channelRef.current.stopListening("MessageSent");
        channelRef.current.stopListeningForWhisper("typing");
        channelRef.current.stopListening("MessageRead");
        echo.leave(channelName);
      }
    };
  }, [chatRoomId, onMessage, onTyping, onRead]);

  // Send typing indicator
  const sendTyping = useCallback(() => {
    if (channelRef.current) {
      channelRef.current.whisper("typing", {
        user: localStorage.getItem("user_email"),
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  return { sendTyping };
}