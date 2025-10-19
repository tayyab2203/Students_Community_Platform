import { useState, useEffect } from 'react';
import messagingService from '../services/messagingService';

const useMessaging = (chatRoomId) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chatRoomId) {
      messagingService.getMessages(chatRoomId)
        .then(setMessages)
        .catch(console.error);
    }
  }, [chatRoomId]);

  const sendMessage = async (messageBody) => {
    try {
      const newMessage = await messagingService.sendMessage(chatRoomId, messageBody);
      setMessages((prev) => [...prev, newMessage]);
    } catch (error) {
      console.error(error);
    }
  };

  return { messages, sendMessage };
};

export default useMessaging;