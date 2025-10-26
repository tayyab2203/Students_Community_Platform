// import apiClient from './apiClient';

// const messagingService = {
//   getChatRooms: async () => {
//     const response = await apiClient.get('/chat-rooms');
//     return response.data;
//   },
//   getChatRoom: async (id) => {
//     const response = await apiClient.get(`/chat-rooms/${id}`);
//     return response.data;
//   },
//   createChatRoom: async (recipientId) => {
//     const response = await apiClient.post('/chat-rooms', { recipient_id: recipientId });
//     return response.data;
//   },
//   sendMessage: async (chatRoomId, messageBody) => {
//     const response = await apiClient.post('/messages', { chat_room_id: chatRoomId, message_body: messageBody });
//     return response.data;
//   },
//   getMessages: async (roomId) => {
//     const response = await apiClient.get(`/messages/${roomId}`);
//     return response.data;
//   },
//   deleteMessage: async (id) => {
//     const response = await apiClient.delete(`/messages/${id}`);
//     return response.data;
//   },
// };

// export default messagingService;

import api from "./apiClient";

// export const getMessages = (roomId) => api.get(`/chat-rooms/${roomId}/messages`);
export const getMessages = (receiverId) => api.get(`/messages/${receiverId}`);

export const sendMessage = (payload) => api.post("/messages", payload);
export const sendTyping = (chat_room_id, is_typing) =>
  api.post("/messages/typing", { chat_room_id, is_typing });
export const markAsRead = (messageId) =>
  api.put(`/messages/${messageId}/read`);
export const markMultipleRead = (ids) =>
  api.put(`/messages/read-multiple`, { message_ids: ids });
