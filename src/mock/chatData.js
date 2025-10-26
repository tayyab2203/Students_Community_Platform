// src/mock/chatData.js
export const mockRooms = [
  {
    id: 1,
    other_user: { id: 2, name: "Kamil", picture: "https://i.pravatar.cc/150?img=2" },
    last_message: "Hey, are you available for the project?",
    last_timestamp: "2025-10-25T10:15:00",
  },
  {
    id: 2,
    other_user: { id: 3, name: "Irfan", picture: "https://i.pravatar.cc/150?img=3" },
    last_message: "Sent you the files.",
    last_timestamp: "2025-10-25T09:45:00",
  },
  {
    id: 3,
    other_user: { id: 4, name: "Fazal", picture: "https://i.pravatar.cc/150?img=4" },
    last_message: "",
    last_timestamp: null,
  },
];

export const mockMessages = {
  1: [
    { id: 1, sender_id: 1, message: "Hello Kamil!", created_at: "2025-10-25T10:00:00" },
    { id: 2, sender_id: 2, message: "Hey, are you available for the project?", created_at: "2025-10-25T10:15:00" },
  ],
  2: [
    { id: 3, sender_id: 3, message: "Sent you the files.", created_at: "2025-10-25T09:45:00" },
  ],
};
