import React, { useState, useEffect, useRef } from "react";
import { X, MessageCircle, ArrowLeft, CheckCheck, Send, Mail, Search, ChevronRight } from "lucide-react";
import Pusher from "pusher-js";
import { getMessages, sendMessage } from "../../services/messagingService";
import apiClient from "../../services/apiClient";

// ChatRoomsList Component
const ChatRoomsList = ({ rooms, onSelectRoom, selectedRoomId }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const filteredRooms = rooms.filter(room =>
        room.other_user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col h-full">
            {/* Search */}
            <div className="px-3 pt-3 pb-3">
                <div className={`relative transition-all duration-300 ${isFocused ? 'scale-105' : ''}`}>
                    <Search
                        size={18}
                        className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${isFocused ? 'text-blue-600' : 'text-gray-400'}`}
                    />
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl transition-all duration-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-200`}
                    />
                    {searchTerm && (
                        <button onClick={() => setSearchTerm("")} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>

            {/* Rooms List */}
            <div className="flex-1 overflow-y-auto space-y-2 px-2 custom-scrollbar">
                {filteredRooms.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-fade-in">
                        <Mail size={64} className="mb-3 opacity-30" />
                        <p className="text-sm font-medium">No conversations found</p>
                    </div>
                ) : (
                    filteredRooms.map((room) => (
                        <div key={room.id} onClick={() => onSelectRoom(room)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer ${selectedRoomId === room.id ? 'bg-blue-50 shadow-md' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-white ${room.unread_count > 0 ? 'bg-blue-600' : 'bg-gray-400'
                                }`}>
                                {room.other_user.avatar}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between">
                                    <h3 className="truncate font-semibold">{room.other_user.name}</h3>
                                    <span className="text-xs text-gray-500">{room.last_message?.timestamp}</span>
                                </div>
                                <p className="text-sm truncate text-gray-500">{room.last_message?.text}</p>
                            </div>
                            <ChevronRight size={18} className="text-blue-600" />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

// MessagesView Component
const MessagesView = ({ room, onBack }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);
    const currentUserId = parseInt(localStorage.getItem("user_id")); // adjust based on your auth

    // Fetch messages for selected room
    useEffect(() => {
        if (!room) return;

        const fetchRoomMessages = async () => {
            try {
                // const res = await getMessages(room.id); // receiverId
                const res = await getMessages(room.other_user.id);

                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRoomMessages();
    }, [room]);

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            // const res = await sendMessage({ receiver_id: room.id, message: newMessage });
            const res = await sendMessage({
                receiver_id: room.other_user.id,
                receiver_type: "App\\Models\\Student",
                message: newMessage,
            });

            setMessages((prev) => [...prev, res.data]);
            setNewMessage("");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center gap-3 p-3 border-b border-gray-200">
                <button onClick={onBack} className="p-2 bg-gray-100 rounded-xl">
                    <ArrowLeft size={18} />
                </button>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">{room.other_user.avatar}</div>
                    <div>
                        <h3 className="font-semibold">{room.other_user.name}</h3>
                        <p className="text-xs text-gray-500">{room.other_user.online ? "Active now" : "Offline"}</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
                {messages.map((msg) => {
                    const isMe = msg.sender_id === currentUserId;
                    return (
                        <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`px-3 py-2 rounded-2xl ${isMe ? "bg-blue-600 text-white" : "bg-white border border-gray-200"}`}>
                                {msg.message}
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 p-3 border-t bg-white">
                <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 border-2 border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-blue-400"
                />
                <button type="submit" className="p-2 bg-blue-600 text-white rounded-xl">
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

// NavbarChatModal Component
const NavbarChatModal = ({ isOpen, onClose }) => {
    const [chatRooms, setChatRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const modalRef = useRef(null);
    const currentUserId = parseInt(localStorage.getItem("user_id"));


    // // ------------------- NEW CHATROOM EVENT -------------------
    // useEffect(() => {
    //     const handleNewChatRoom = (e) => {
    //         const student = e.detail;
    //         setChatRooms(prevRooms => {
    //             const exists = prevRooms.some(r => r.other_user.id === student.id);
    //             if (!exists) {
    //                 return [
    //                     {
    //                         id: student.id,
    //                         other_user: {
    //                             name: student.name,
    //                             avatar: student.name.slice(0, 2).toUpperCase(),
    //                             online: student.available || false
    //                         },
    //                         last_message: { text: "", timestamp: "", is_read: true },
    //                         unread_count: 0
    //                     },
    //                     ...prevRooms
    //                 ];
    //             }
    //             return prevRooms;
    //         });
    //     };

    //     window.addEventListener("newChatRoom", handleNewChatRoom);
    //     return () => window.removeEventListener("newChatRoom", handleNewChatRoom);
    // }, []);

    useEffect(() => {
        const handleNewChatRoom = (e) => {
            const student = e.detail;
            setChatRooms(prevRooms => {
                const exists = prevRooms.some(r => r.id === student.id);
                if (!exists) {
                    return [
                        {
                            id: student.id,
                            other_user: {
                                name: student.name,
                                avatar: student.name.slice(0, 2).toUpperCase(),
                                online: student.available || false
                            },
                            last_message: { text: "", timestamp: "", is_read: true },
                            unread_count: 0
                        },
                        ...prevRooms
                    ];
                }
                // Update last_message if room exists
                return prevRooms.map(r => r.id === student.id ? { ...r, last_message: r.last_message } : r);
            });
        };
        window.addEventListener("newChatRoom", handleNewChatRoom);
        return () => window.removeEventListener("newChatRoom", handleNewChatRoom);
    }, []);






    // Fetch chat rooms + unread counts
    useEffect(() => {
        if (!isOpen) return;

        const fetchRooms = async () => {
            try {
                const res = await apiClient.get("/chat-rooms"); // backend endpoint
                setChatRooms(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRooms();
    }, [isOpen]);

    // Close on Escape
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) onClose();
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    // Pusher for real-time
    useEffect(() => {
        if (!isOpen) return;

        // const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
        //     cluster: import.meta.env.VITE_PUSHER_CLUSTER,
        // });
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_KEY, {
            cluster: import.meta.env.VITE_PUSHER_CLUSTER,
            authEndpoint: "http://localhost:8000/broadcasting/auth",
            auth: {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    Accept: "application/json",
                },
            },
        });

        const channel = pusher.subscribe(`private-messages.${currentUserId}`);

        channel.bind("MessageSent", (data) => {
            // Update messages if active room
            if (selectedRoom?.id === data.sender_id || selectedRoom?.id === data.receiver_id) {
                setChatRooms((prevRooms) => [...prevRooms]); // trigger re-render for unread
            }
        });

        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [selectedRoom, currentUserId, isOpen]);

    if (!isOpen) return null;

    const unreadCount = chatRooms.filter(r => r.unread_count > 0).length;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[2px]" onClick={onClose} />
            <div ref={modalRef} className="absolute top-full right-0 mt-3 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden z-50" style={{ height: '520px' }}>
                {/* Header */}
                {!selectedRoom && (
                    <div className="relative p-4 bg-blue-600 text-white flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <MessageCircle size={20} />
                            <div>
                                <h2 className="text-lg font-bold">Messages {unreadCount > 0 && <span className="bg-red-500 px-2 py-0.5 rounded-full">{unreadCount}</span>}</h2>
                                <p className="text-xs text-blue-100">Stay connected with your network</p>
                            </div>
                        </div>
                        <button onClick={onClose}><X size={18} /></button>
                    </div>
                )}

                {/* Content */}
                <div className="h-full">
                    {selectedRoom ? (
                        <MessagesView room={selectedRoom} onBack={() => setSelectedRoom(null)} />
                    ) : (
                        <ChatRoomsList rooms={chatRooms} onSelectRoom={setSelectedRoom} selectedRoomId={selectedRoom?.id} />
                    )}
                </div>
            </div>
        </>
    );
};

export default NavbarChatModal;
