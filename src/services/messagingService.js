import apiClient from './apiClient';

const messagingService = {
  getChatRooms: async () => {
    const response = await apiClient.get('/chat-rooms');
    return response.data;
  },
  getChatRoom: async (id) => {
    const response = await apiClient.get(`/chat-rooms/${id}`);
    return response.data;
  },
  createChatRoom: async (recipientId) => {
    const response = await apiClient.post('/chat-rooms', { recipient_id: recipientId });
    return response.data;
  },
  sendMessage: async (chatRoomId, messageBody) => {
    const response = await apiClient.post('/messages', { chat_room_id: chatRoomId, message_body: messageBody });
    return response.data;
  },
  getMessages: async (roomId) => {
    const response = await apiClient.get(`/messages/${roomId}`);
    return response.data;
  },
  deleteMessage: async (id) => {
    const response = await apiClient.delete(`/messages/${id}`);
    return response.data;
  },
};

export default messagingService;