import React, { useEffect, useState, useRef } from "react";
import { X, Send, User, Check, CheckCheck } from "lucide-react";
import apiClient from "../../services/apiClient";
import echo from "../../utils/echo";

const ChatModal = ({ isOpen, onClose, receiver }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const channelRef = useRef(null);

  // Get current user ID from localStorage
  const currentUserId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch messages & setup real-time listening
  useEffect(() => {
    if (!isOpen || !receiver?.id) return;

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const res = await apiClient.get(`/messages/${receiver.id}`);
        setMessages(res.data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // ✅ Subscribe to private channel using Laravel Echo
    const channelName = `private-chat.${receiver.id}`;
    channelRef.current = echo.private(channelName);

    // Listen for new messages
    channelRef.current.listen("MessageSent", (data) => {
      console.log("📩 New message received:", data);
      setMessages((prev) => [...prev, data.message]);
    });

    // Listen for typing indicators
    channelRef.current.listenForWhisper("typing", (e) => {
      console.log("⌨️ User is typing:", e);
      setIsTyping(true);
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = setTimeout(() => setIsTyping(false), 3000);
    });

    // Cleanup on unmount
    return () => {
      if (channelRef.current) {
        channelRef.current.stopListening("MessageSent");
        channelRef.current.stopListeningForWhisper("typing");
        echo.leave(channelName);
      }
    };
  }, [isOpen, receiver?.id]);

  // Send message
  // const handleSend = async (e) => {
  //   e.preventDefault();
  //   if (!newMessage.trim()) return;

  //   try {
  //     const res = await apiClient.post("/messages", {
  //       receiver_id: receiver.id,
  //       message: newMessage,
  //     });
  //     setMessages((prev) => [...prev, res.data]);
  //     setNewMessage("");
  //   } catch (err) {
  //     console.error("Error sending message:", err);
  //   }
  // };


  const handleSend = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await apiClient.post("/messages", {
        receiver_id: receiver.id,
        receiver_type: "App\\Models\\Student", // 👈 required for polymorphic
        message: newMessage,
      });

      // Update messages in ChatModal
      setMessages((prev) => [...prev, res.data]);
      setNewMessage("");

      // ✅ Dispatch event for NavbarChatModal to add/update chat room
      window.dispatchEvent(new CustomEvent("newChatRoom", { detail: receiver }));

    } catch (err) {
      console.error("Error sending message:", err);
    }
  };


  // Handle typing indicator
  const handleTyping = () => {
    if (channelRef.current && !typingTimeoutRef.current) {
      channelRef.current.whisper("typing", {
        user: localStorage.getItem("user_email"),
      });
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      typingTimeoutRef.current = null;
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden transform transition-all duration-300 animate-scale-in border border-gray-100">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

        {/* Header with Enhanced Design */}
        <div className="relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-400/20 via-transparent to-transparent animate-pulse-slow" />

          <div className="relative flex items-center justify-between p-5 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg ring-4 ring-white/20">
                  {receiver.name ? receiver.name.charAt(0).toUpperCase() : <User size={24} />}
                </div>
                {/* Online Status */}
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white animate-ping-slow" />
                <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  {receiver.name || "User"}
                </h2>
                <p className="text-xs text-blue-100 font-medium">Active now</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:rotate-90 group"
            >
              <X size={20} className="text-white group-hover:text-red-200 transition-colors" />
            </button>
          </div>
        </div>

        {/* Messages Area with Enhanced Design */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-gray-50 via-white to-gray-50 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full animate-fade-in">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-full blur-xl" />
              </div>
              <p className="text-gray-500 mt-4 font-medium">Loading messages...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 animate-fade-in">
              <div className="relative mb-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <Send size={40} className="text-blue-500 opacity-50" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent rounded-full blur-xl" />
              </div>
              <p className="text-base font-semibold text-gray-600">No messages yet</p>
              <p className="text-sm text-gray-400 mt-1">Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const isSentByMe = msg.sender_id === currentUserId;
              const time = msg.created_at
                ? new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
                : "";

              return (
                <div
                  key={msg.id}
                  className={`flex ${isSentByMe ? "justify-end" : "justify-start"} animate-slide-up`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div
                    className={`flex flex-col ${isSentByMe ? "items-end" : "items-start"
                      } max-w-[75%]`}
                  >
                    <div
                      className={`group relative px-4 py-2.5 rounded-2xl shadow-sm transition-all duration-200 hover:shadow-md ${isSentByMe
                          ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm"
                          : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm"
                        }`}
                    >
                      <p className="text-sm leading-relaxed break-words">{msg.message}</p>

                      {/* Message Tail */}
                      <div
                        className={`absolute bottom-0 ${isSentByMe
                            ? "right-0 translate-x-1"
                            : "left-0 -translate-x-1"
                          }`}
                      >
                        <div
                          className={`w-3 h-3 ${isSentByMe
                              ? "bg-blue-700"
                              : "bg-white border-b border-r border-gray-200"
                            }`}
                          style={{
                            clipPath: isSentByMe
                              ? "polygon(0 0, 100% 0, 0 100%)"
                              : "polygon(0 0, 100% 100%, 100% 0)",
                          }}
                        />
                      </div>
                    </div>

                    <div className={`flex items-center gap-1 mt-1 px-1 ${isSentByMe ? "flex-row-reverse" : ""}`}>
                      <span className="text-xs text-gray-400 font-medium">{time}</span>
                      {isSentByMe && (
                        <CheckCheck size={14} className="text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Typing Indicator with Animation */}
        {isTyping && (
          <div className="px-4 py-3 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 border-t border-blue-100 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
              <span className="text-sm text-gray-600 font-medium">
                {receiver.name} is typing...
              </span>
            </div>
          </div>
        )}

        {/* Input Area with Enhanced Design */}
        <form
          onSubmit={handleSend}
          className="p-4 border-t bg-white flex items-center gap-3"
        >
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100 transition-all duration-200 bg-gray-50 focus:bg-white"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className={`relative p-3 rounded-xl transition-all duration-200 ${newMessage.trim()
                ? "bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
          >
            <Send size={20} className={newMessage.trim() ? "animate-pulse-subtle" : ""} />
          </button>
        </form>

        {/* Footer Decorative Border */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }

        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes ping-slow {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.3s ease-out both;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 1.5s ease-in-out infinite;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }

        /* Custom Scrollbar */
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #93c5fd, #3b82f6);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #60a5fa, #2563eb);
        }
      `}</style>
    </div>
  );
};

export default ChatModal;