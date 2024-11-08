
import { FaTelegram } from "react-icons/fa";

import React, { useEffect, useState } from 'react';

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeChat, setActiveChat] = useState(15); // Default active chat ID

  useEffect(() => {
    const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

    ws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    ws.onmessage = (event) => {
      const incomingMessage = JSON.parse(event.data);
      console.log('Message received:', incomingMessage);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          content: incomingMessage.message,
          time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
          sender: incomingMessage.sender || 'John', // Assuming sender info is present
        }
      ]);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (inputValue.trim() === '') return;

    const data = {
      message: inputValue,
      receiver_id: activeChat,
       sender_id: 29 
    };

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(data));
      console.log('Message sent:', data);
      setInputValue('');
    } else {
      console.error('WebSocket is not open');
    }
  };

  return (
    <div className="flex h-screen bg- rounded-lg ">
      {/* Sidebar: List of Conversations */}
      <div className="w-1/4 bg-blue-800 text-white border-r border-blue-700 overflow-y-auto rounded-lg">
        <div className="p-4 border-b border-blue-700">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className=" p-2">
          <div>
          <div
            className="flex flex-col gap-2 items-start justify-between border cursor-pointer p-4 hover:bg-gray-300 border-b border-blue-500 bg-gray-100"
            onClick={() => setActiveChat(15)}
          >
            <div className="flex gap-2 justify-between items-center">
            <img
              src="https://avatar.iran.liara.run/public/boy?username=Ash" 
              alt="User avatar"
              className="w-10 h-10 rounded-full "
            />
            <div>
              <p className="font-medium text-black">John Snow</p>
              <p className="text-sm text-black">Last message preview...</p>
            </div>
            </div>
            <div className=" flex justify-between items-center w-full px-4">
            <span className=" text-sm text-blue-400">4:30 PM</span>
            <span className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">3</span>
            </div>
          </div>
          </div>
          {/* Add more chat items here */}
        </div>
      </div>

      {/* Main: Active Chat */}
      <div className="flex-1 flex flex-col bg-blue-900 rounded-lg">
        {/* Chat Header */}
        <div className="p-4 border-b border-blue-700 flex items-center">
          <img
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt="User avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-white">John Snow</h2>
            <p className="text-sm text-blue-400">Online</p>
          </div>
        </div>

        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          <div className="flex flex-col space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'John' ? 'justify-start' : 'justify-end'} space-x-2`}
              >
                {msg.sender === 'John' && (
                  <img
                    src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
                    alt="User avatar"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <div
                  className={`bg-${msg.sender === 'John' ? 'blue-700' : 'blue-600'} text-white p-3 rounded-xl bg-blue-400  max-w-xs`}
                >
                  <p className="text-white break-words">{msg.content}</p>
                </div>
                <span className="text-xs text-blue-400 self-end">{msg.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t border-blue-700 bg-blue-900 p-4 flex items-center">
          <input
            type="text"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1 bg-blue-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-700 transition"
            onClick={sendMessage}
          ><FaTelegram/>
          
          </button>
        </div>
      </div>

      {/* Right Panel: Profile Info
      <div className="w-1/4 bg-blue-800 text-white p-4 border-l border-blue-700">
        <div className="flex items-center space-x-4">
          <img
            src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
            alt="Profile avatar"
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h3 className="text-lg font-semibold">Annabel White</h3>
            <p className="text-sm text-blue-400">7,876 trips | Joined Sep 2022</p>
          </div>
        </div>
        <p className="mt-4 text-sm text-blue-400">
          Hi, I'm Annabel! I have a rich fleet of spaceships for unforgettable journeys into space!
        </p>
      
        <div className="mt-4">
          <h4 className="text-sm font-semibold">Media</h4>
         
        </div> 
      </div>*/}
    </div>
  );
};

export default ChatBoxContentField;






    
{/*
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <img
             
              src="/images/resource/candidate-8.png"
              alt="candidates"
              className="rounded-circle user_img"
            />
          </div>
          <div className="user_info">
            <span>Arlene McCoy</span>
            <p>Active</p>
          </div>
        </div>

        <div className="btn-box">
          <button className="dlt-chat">Delete Conversation</button>
          <ChatHamburger />
        </div>
      </div>
      

      <div className="card-body msg_card_body">
        <div className="d-flex justify-content-start mb-2">
          <div className="img_cont_msg">
            <img
             
              src="/images/resource/candidate-3.png"
              alt="candidates"
              className="rounded-circle user_img_msg"
            />
            <div className="name">
              Albert Flores <span className="msg_time">35 mins</span>
            </div>
          </div>
          <div className="msg_cotainer">
            How likely are you to recommend our company to your friends and
            family?
          </div>
        </div>

        <div className="d-flex justify-content-end mb-2 reply">
          <div className="img_cont_msg">
            <img
             
              src="/images/resource/candidate-6.png"
              alt="candidate"
              className="rounded-circle user_img_msg"
            />
            <div className="name">
              You <span className="msg_time">35 mins</span>
            </div>
          </div>
          <div className="msg_cotainer">
            Hey there, we’re just writing to let you know that you’ve been
            subscribed to a repository on GitH
          </div>
        </div>

        <div className="d-flex justify-content-start">
          <div className="img_cont_msg">
            <img
             
              src="/images/resource/candidate-3.png"
              alt="candidate"
              className="rounded-circle user_img_msg"
            />
            <div className="name">
              Cameron Williamson <span className="msg_time">35 mins</span>
            </div>
          </div>
          <div className="msg_cotainer">Ok, Understood!</div>
        </div>
      </div>
     

      <div className="card-footer">
        <div className="form-group mb-0">
          <form>
            <textarea
              className="form-control type_msg"
              placeholder="Type a message..."
              required
            ></textarea>
            <button
              type="submit"
              className="theme-btn btn-style-one submit-btn"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
       End .card-footer */}