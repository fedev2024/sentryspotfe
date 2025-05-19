import React, { useEffect, useState, useRef } from 'react';
import { FaTelegram, FaUserCircle } from "react-icons/fa";
import EnhancedChatboxContactList, { getDummyImage } from './ContactList';
import SearchBox from './SearchBox';
import { Constant } from "@/utils/constant/constant";
import axios from 'axios';
import { useSelector } from 'react-redux';

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeUser, setActiveUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [lastMessageId, setLastMessageId] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [imageError, setImageError] = useState(false);
  const messagesEndRef = useRef(null);
  const {userInfo} = useSelector((state)=>(state.auth));

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Get current user ID from localStorage or context
    const userData = JSON.parse(localStorage.getItem(Constant.USER_DATA) || '{}');
    console.log('User Data from localStorage:', userData);
    const userId = userData.id;
    console.log('User ID being set:', userId);
    setCurrentUserId(userId);
    
    // Get token for WebSocket connection
    const token = localStorage.getItem(Constant.USER_TOKEN);
    
    // Connect to WebSocket with authentication
    const ws = new WebSocket(`wss://api.sentryspot.co.uk/ws?token=${token}`);

    ws.onopen = () => {
      console.log('WebSocket connection opened');
      // Send initial connection message
      ws.send(JSON.stringify({
        type: 'connection',
        user_id: userId
      }));
    };

    ws.onmessage = (event) => {
      try {
        const incomingMessage = JSON.parse(event.data);
        console.log('Message received:', incomingMessage);

        // Handle different types of messages
        if (incomingMessage.type === 'message') {
          // Ignore invalid messages
          if (!incomingMessage.message || 
              !incomingMessage.sender_id || 
              !incomingMessage.receiver_id || 
              incomingMessage.message.trim() === '') {
            console.log('Ignoring invalid message:', incomingMessage);
            return;
          }

          setMessages((prevMessages) => {
            // Check if message already exists
            const messageExists = prevMessages.some(msg => 
              msg.id === incomingMessage.id || 
              (msg.message === incomingMessage.message && 
               msg.sender_id === incomingMessage.sender_id &&
               msg.receiver_id === incomingMessage.receiver_id &&
               Math.abs(new Date(msg.date_time) - new Date(incomingMessage.date_time)) < 1000)
            );

            if (messageExists) {
              return prevMessages;
            }

            // Format the message exactly like the API response
            const formattedMessage = {
              id: incomingMessage.id,
              message: incomingMessage.message,
              sender_id: incomingMessage.sender_id,
              receiver_id: incomingMessage.receiver_id,
              sender_type: incomingMessage.sender_type || "",
              date_time: incomingMessage.date_time,
              read: incomingMessage.read || false
            };

            return [...prevMessages, formattedMessage];
          });
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
      // Attempt to reconnect after 5 seconds
      setTimeout(() => {
        setSocket(null);
      }, 5000);
    };

    setSocket(ws);

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    };
  }, []);

  // Load chat messages
  const loadChatMessages = async (userId, chatUserId, lastId) => {
    try {
      const token = localStorage.getItem(Constant.USER_TOKEN);
      const response = await axios.get(
        `https://api.sentryspot.co.uk/api/jobseeker/chat-user-list-messages`,
        {
          params: {
            chat_user_id: chatUserId,
            last_message_id: lastId
          },
          headers: {
            'Authorization': `${token}`,
          }
        }
      );

      if (response.data.status === "success" && Array.isArray(response.data.data)) {
        const formattedMessages = response.data.data.map(msg => ({
          id: msg.id,
          message: msg.message,
          sender_id: msg.sender_id,
          receiver_id: msg.receiver_id,
          sender_type: msg.sender_type,
          date_time: msg.date_time,
          read: msg.read
        }));

        if (formattedMessages.length > 0) {
          setLastMessageId(formattedMessages[0].id);
        }

        return formattedMessages;
      }
      return [];
    } catch (err) {
      console.error('Error loading chat messages:', err);
      return [];
    }
  };

  // Handle scroll to load older messages
  useEffect(() => {
    if (!activeUser) return;

    const handleScroll = async (e) => {
      const element = e.target;
      if (element.scrollTop === 0 && !isLoading) {
        setIsLoading(true);
        const olderMessages = await loadChatMessages(
          currentUserId,
          activeUser.chat_user_id,
          lastMessageId
        );
        setMessages(prev => [...olderMessages, ...prev]);
        setIsLoading(false);
      }
    };

    const messagesContainer = document.querySelector('.messages-container');
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (messagesContainer) {
        messagesContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, [activeUser, currentUserId, lastMessageId, isLoading]);

  const handleSelectUser = async (user) => {
    setActiveUser(user);
    setMessages([]);
    setLastMessageId(0);
    setImageError(false);
    
    // Load initial messages
    const initialMessages = await loadChatMessages(currentUserId, user.chat_user_id, 0);
    setMessages(initialMessages);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const sendMessage = () => {
    if (inputValue.trim() === '' || !activeUser) return;

    const userData = JSON.parse(localStorage.getItem(Constant.USER_DATA) || '{}');
    console.log('User Data in sendMessage:', userData);
    const userId = userData.id;
    console.log('User ID in sendMessage:', userId);

    if (!userId) {
      console.error('No user ID found in localStorage');
      return;
    }

    // Format the message exactly like the API response
    const messageData = {
      type: 'message',
      message: inputValue.trim(),
      sender_id: parseInt(userId),
      receiver_id: parseInt(activeUser.chat_user_id),
      sender_type: "",
      date_time: new Date().toISOString().replace('T', ' ').slice(0, 19),
      read: false
    };

    console.log('Sending message data:', messageData);

    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(JSON.stringify(messageData));
        
        // Only add optimistic message if we have valid data
        if (messageData.message && messageData.sender_id && messageData.receiver_id) {
          const optimisticMessage = {
            id: 0,
            message: messageData.message,
            sender_id: messageData.sender_id,
            receiver_id: messageData.receiver_id,
            sender_type: messageData.sender_type,
            date_time: messageData.date_time,
            read: messageData.read
          };

          console.log('Optimistic message:', optimisticMessage);
          setMessages(prev => [...prev, optimisticMessage]);
        }
        setInputValue('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('WebSocket is not open');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const getAvatarSrc = (user) => {
    if (!imageError && user.photo) {
      return user.photo;
    }
    const fullName = `${user.first_name} ${user.last_name || ''}`.trim();
    return getDummyImage(fullName, 0);
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-blue-100 shadow-lg">
        <div className="search-box-one p-2">
          <SearchBox />
        </div>
        <EnhancedChatboxContactList 
          onSelectUser={handleSelectUser}
          activeUserId={activeUser?.id}
        />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-sm flex items-center border-b border-blue-100">
              <img
                src={getAvatarSrc(activeUser)}
                onError={handleImageError}
                alt={`${activeUser.first_name} ${activeUser.last_name || ''}'s avatar`}
                className="w-12 h-12 rounded-full mr-4 object-cover border border-gray-200"
              />
              <div>
                <h2 className="text-lg font-semibold text-blue-800">
                  {activeUser.first_name} {activeUser.last_name || ''}
                </h2>
                <p className="text-sm text-green-500">Online</p>
              </div>
              {activeUser.company_name && (
                <span className="ml-auto bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {activeUser.company_name}
                </span>
              )}
            </div>

            {/* Messages Display */}
            <div className="flex-1 overflow-y-auto p-6 bg-blue-50 scrollbar-custom messages-container">
              {isLoading && (
                <div className="flex justify-center mb-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              )}
              <div className="space-y-4">
                {messages.length > 0 ? (
                  messages.map((msg) => {
                    const isSender = parseInt(msg.sender_id) === parseInt(currentUserId);
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${isSender ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isSender && (
                          <img
                            src={getAvatarSrc(activeUser)}
                            alt={`${activeUser.first_name}'s avatar`}
                            className="w-8 h-8 rounded-full mr-2 self-end mb-1"
                          />
                        )}
                        <div className={`
                          max-w-xs p-3 rounded-xl shadow-sm relative
                          ${isSender 
                            ? 'bg-blue-600 text-white rounded-br-none' 
                            : 'bg-white text-blue-800 border border-blue-100 rounded-bl-none'}
                        `}>
                          <p className="break-words">{msg.message}</p>
                          <div className={`text-xs text-opacity-70 text-right mt-1 
                            ${isSender ? 'text-blue-200' : 'text-blue-500'}
                          `}>
                            {new Date(msg.date_time).toLocaleTimeString()}
                            {isSender && (
                              <span className="ml-2">
                                {msg.read ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                        {isSender && (
                          <img
                            src={getAvatarSrc(userInfo)}
                            alt="Your avatar"
                            className="w-8 h-8 rounded-full ml-2 self-end mb-1"
                          />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                    <svg className="w-16 h-16 mb-4 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <p>No messages yet. Start a conversation!</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-blue-100">
              <div className="flex items-center space-x-3">
                <button className="text-blue-500 hover:text-blue-700">
                  <FaUserCircle size={24} />
                </button>
                <input
                  type="text"
                  placeholder="Type a message"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 p-2 bg-blue-50 text-blue-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button 
                  onClick={sendMessage}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
                >
                  <FaTelegram size={24} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No active chat
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center p-8 max-w-md">
              <svg className="w-24 h-24 text-blue-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Select a conversation</h3>
              <p className="text-gray-600">Choose a contact from the list to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBoxContentField;