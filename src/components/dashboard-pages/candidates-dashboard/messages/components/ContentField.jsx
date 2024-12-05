
// import { FaTelegram } from "react-icons/fa";

// import React, { useEffect, useState } from 'react';
// import ChatboxContactList from "./ContactList";

// const ChatBoxContentField = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [activeChat, setActiveChat] = useState(15); // Default active chat ID

//   useEffect(() => {
//     const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       console.log('Message received:', incomingMessage);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           content: incomingMessage.message,
//           time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
//           sender: incomingMessage.sender || 'John', // Assuming sender info is present
//         }
//       ]);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputValue.trim() === '') return;

//     const data = {
//       message: inputValue,
//       receiver_id: activeChat,
//        sender_id: 29 
//     };

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(data));
//       console.log('Message sent:', data);
//       setInputValue('');
//     } else {
//       console.error('WebSocket is not open');
//     }
//   };

//   return (
//     <div className="flex h-screen bg- rounded-lg gap-2 ">
//       {/* Sidebar: List of Conversations */}
//       {/* <div className="w-1/4 bg-gray-50 text-black border-r border-2 overflow-y-auto rounded-lg">
//         <div className="p-4 border-b border-blue-700">
//           <h2 className="text-lg font-semibold">Messages</h2>
//         </div>
//         <div className=" p-2">
//           <div>
//           <div
//             className="flex flex-col gap-2 items-start justify-between border cursor-pointer p-4 hover:bg-gray-300 border-b border-blue-500 bg-gray-100"
//             onClick={() => setActiveChat(15)}
//           >
//             <div className="flex gap-2 justify-between items-center">
//             <img
//               src="https://avatar.iran.liara.run/public/boy?username=Ash" 
//               alt="User avatar"
//               className="w-10 h-10 rounded-full "
//             />
//             <div>
//               <p className="font-medium text-black">John Snow</p>
//               <p className="text-sm text-black">Last message preview...</p>
//             </div>
//             </div>
//             <div className=" flex justify-between items-center w-full px-4">
//             <span className=" text-sm text-blue-400">4:30 PM</span>
//             <span className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">3</span>
//             </div>
//           </div>
//           </div>
//         </div>
//       </div> */}
//       <ChatboxContactList />
//       {/* Main: Active Chat */}
//       <div className="flex-1 flex flex-col bg-gary-50 text-black rounded-xl">
//         {/* Chat Header */}
//         <div className="p-4 border-b border-2 flex items-center">
//           <img
//             src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//             alt="User avatar"
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-black">John Snow</h2>
//             <p className="text-sm text-black">Online</p>
//           </div>
//         </div>

//         {/* Messages Display */}
//         <div className="flex-1 overflow-y-auto p-4 bg-white">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.sender === 'John' ? 'justify-start' : 'justify-end'} space-x-2`}
//               >
//                 {msg.sender === 'John' && (
//                   <img
//                     src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//                     alt="User avatar"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 )}
//                 <div
//                   className={`bg-${msg.sender === 'John' ? 'blue-700' : 'blue-600'} text-white p-3 rounded-xl bg-blue-400  max-w-xs`}
//                 >
//                   <p className="text-white break-words">{msg.content}</p>
//                 </div>
//                 <span className="text-xs text-blue-400 self-end">{msg.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="border-t border-2 bg-blue-600 p-4 flex items-center rounded-lg">
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-blue-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             className="bg-blue-600 text-3xl text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-700 transition"
//             onClick={sendMessage}
//           ><FaTelegram/>
          
//           </button>
//         </div>
//       </div>

//       {/* Right Panel: Profile Info
//       <div className="w-1/4 bg-blue-800 text-white p-4 border-l border-blue-700">
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//             alt="Profile avatar"
//             className="w-16 h-16 rounded-full"
//           />
//           <div>
//             <h3 className="text-lg font-semibold">Annabel White</h3>
//             <p className="text-sm text-blue-400">7,876 trips | Joined Sep 2022</p>
//           </div>
//         </div>
//         <p className="mt-4 text-sm text-blue-400">
//           Hi, I'm Annabel! I have a rich fleet of spaceships for unforgettable journeys into space!
//         </p>
      
//         <div className="mt-4">
//           <h4 className="text-sm font-semibold">Media</h4>
         
//         </div> 
//       </div>*/}
//     </div>
//   );
// };

// export default ChatBoxContentField;

// import { FaTelegram } from "react-icons/fa";

// import React, { useEffect, useState } from 'react';
// import ChatboxContactList from "./ContactList";

// const ChatBoxContentField = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [activeChat, setActiveChat] = useState(15); // Default active chat ID

//   useEffect(() => {
//     const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       console.log('Message received:', incomingMessage);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           content: incomingMessage.message,
//           time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
//           sender: incomingMessage.sender || 'John', // Assuming sender info is present
//         }
//       ]);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputValue.trim() === '') return;

//     const data = {
//       message: inputValue,
//       receiver_id: activeChat,
//        sender_id: 29 
//     };

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(data));
//       console.log('Message sent:', data);
//       setInputValue('');
//     } else {
//       console.error('WebSocket is not open');
//     }
//   };

//   return (
//     <div className="flex h-screen bg- rounded-lg gap-2 ">
//       {/* Sidebar: List of Conversations */}
//       {/* <div className="w-1/4 bg-gray-50 text-black border-r border-2 overflow-y-auto rounded-lg">
//         <div className="p-4 border-b border-blue-700">
//           <h2 className="text-lg font-semibold">Messages</h2>
//         </div>
//         <div className=" p-2">
//           <div>
//           <div
//             className="flex flex-col gap-2 items-start justify-between border cursor-pointer p-4 hover:bg-gray-300 border-b border-blue-500 bg-gray-100"
//             onClick={() => setActiveChat(15)}
//           >
//             <div className="flex gap-2 justify-between items-center">
//             <img
//               src="https://avatar.iran.liara.run/public/boy?username=Ash" 
//               alt="User avatar"
//               className="w-10 h-10 rounded-full "
//             />
//             <div>
//               <p className="font-medium text-black">John Snow</p>
//               <p className="text-sm text-black">Last message preview...</p>
//             </div>
//             </div>
//             <div className=" flex justify-between items-center w-full px-4">
//             <span className=" text-sm text-blue-400">4:30 PM</span>
//             <span className="bg-blue-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">3</span>
//             </div>
//           </div>
//           </div>
//         </div>
//       </div> */}
//       <ChatboxContactList />
//       {/* Main: Active Chat */}
//       <div className="flex-1 flex flex-col bg-gary-50 text-black rounded-xl">
//         {/* Chat Header */}
//         <div className="p-4 border-b border-2 flex items-center">
//           <img
//             src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//             alt="User avatar"
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-black">John Snow</h2>
//             <p className="text-sm text-black">Online</p>
//           </div>
//         </div>

//         {/* Messages Display */}
//         <div className="flex-1 overflow-y-auto p-4 bg-white">
//           <div className="flex flex-col space-y-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.sender === 'John' ? 'justify-start' : 'justify-end'} space-x-2`}
//               >
//                 {msg.sender === 'John' && (
//                   <img
//                     src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//                     alt="User avatar"
//                     className="w-8 h-8 rounded-full"
//                   />
//                 )}
//                 <div
//                   className={`bg-${msg.sender === 'John' ? 'blue-700' : 'blue-600'} text-white p-3 rounded-xl bg-blue-400  max-w-xs`}
//                 >
//                   <p className="text-white break-words">{msg.content}</p>
//                 </div>
//                 <span className="text-xs text-blue-400 self-end">{msg.time}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="border-t border-2 bg-blue-600 p-4 flex items-center rounded-lg">
//           <input
//             type="text"
//             placeholder="Type a message"
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//             className="flex-1 bg-blue-800 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             className="bg-blue-600 text-3xl text-white px-4 py-2 rounded-lg ml-2 hover:bg-blue-700 transition"
//             onClick={sendMessage}
//           ><FaTelegram/>
          
//           </button>
//         </div>
//       </div>

//       {/* Right Panel: Profile Info
//       <div className="w-1/4 bg-blue-800 text-white p-4 border-l border-blue-700">
//         <div className="flex items-center space-x-4">
//           <img
//             src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg"
//             alt="Profile avatar"
//             className="w-16 h-16 rounded-full"
//           />
//           <div>
//             <h3 className="text-lg font-semibold">Annabel White</h3>
//             <p className="text-sm text-blue-400">7,876 trips | Joined Sep 2022</p>
//           </div>
//         </div>
//         <p className="mt-4 text-sm text-blue-400">
//           Hi, I'm Annabel! I have a rich fleet of spaceships for unforgettable journeys into space!
//         </p>
      
//         <div className="mt-4">
//           <h4 className="text-sm font-semibold">Media</h4>
         
//         </div> 
//       </div>*/}
//     </div>
//   );
// };

// export default ChatBoxContentField;

// import React, { useEffect, useState } from 'react';
// import { FaTelegram, FaUserCircle } from "react-icons/fa";
// import ChatboxContactList from './ContactList';
// import SearchBox from './SearchBox';

// const ChatBoxContentField = () => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [activeChat, setActiveChat] = useState(15);
//   const [contacts, setContacts] = useState([
//     { 
//       id: 15, 
//       name: 'John Snow', 
//       avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash',
//       lastMessage: 'Hello, how are you?',
//       time: '4:30 PM',
//       unreadCount: 3
//     },
//     { 
//       id: 16, 
//       name: 'Emma Watson', 
//       avatar: 'https://avatar.iran.liara.run/public/girl?username=Emma',
//       lastMessage: 'See you later',
//       time: '3:45 PM',
//       unreadCount: 1
//     }
//   ]);

//   useEffect(() => {
//     const ws = new WebSocket('wss://api.sentryspot.co.uk/ws');

//     ws.onopen = () => {
//       console.log('WebSocket connection opened');
//     };

//     ws.onmessage = (event) => {
//       const incomingMessage = JSON.parse(event.data);
//       console.log('Message received:', incomingMessage);

//       setMessages((prevMessages) => [
//         ...prevMessages,
//         {
//           content: incomingMessage.message,
//           time: incomingMessage.timestamp || new Date().toLocaleTimeString(),
//           sender: incomingMessage.sender || 'John',
//         }
//       ]);
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     setSocket(ws);

//     return () => {
//       ws.close();
//     };
//   }, []);

//   const sendMessage = () => {
//     if (inputValue.trim() === '') return;

//     const data = {
//       message: inputValue,
//       receiver_id: activeChat,
//       sender_id: 29 
//     };

//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(JSON.stringify(data));
//       console.log('Message sent:', data);
//       setInputValue('');
//     } else {
//       console.error('WebSocket is not open');
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       sendMessage();
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Contacts Sidebar */}
//       <div className="w-80 bg-white border-r shadow-md">
//       <div className="search-box-one">
//               <SearchBox />
//             </div>
//         <ChatboxContactList />
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 flex flex-col">
//         {/* Chat Header */}
//         <div className="bg-white p-4 shadow-sm flex items-center">
//           <img
//             src="https://avatar.iran.liara.run/public/boy?username=Ash"
//             alt="User avatar"
//             className="w-12 h-12 rounded-full mr-4"
//           />
//           <div>
//             <h2 className="text-lg font-semibold text-gray-800">John Snow</h2>
//             <p className="text-sm text-green-500">Online</p>
//           </div>
//         </div>

//         {/* Messages Display */}
//         <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
//           <div className="space-y-4">
//             {messages.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.sender === 'John' ? 'justify-start' : 'justify-end'}`}
//               >
//                 <div className={`
//                   max-w-xs p-3 rounded-xl 
//                   ${msg.sender === 'John' 
//                     ? 'bg-white text-gray-800 rounded-bl-none' 
//                     : 'bg-blue-500 text-white rounded-br-none'}
//                 `}>
//                   <p className="break-words">{msg.content}</p>
//                   <div className="text-xs text-opacity-70 text-right mt-1">
//                     {msg.time}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Input Area */}
//         <div className="bg-white p-4 border-t">
//           <div className="flex items-center space-x-3">
//             <button className="text-gray-500 hover:text-blue-500">
//               <FaUserCircle size={24} />
//             </button>
//             <input
//               type="text"
//               placeholder="Type a message"
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               onKeyPress={handleKeyPress}
//               className="flex-1 p-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
//             />
//             <button 
//               onClick={sendMessage}
//               className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
//             >
//               <FaTelegram size={24} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBoxContentField;
import React, { useEffect, useState } from 'react';
import { FaTelegram, FaUserCircle } from "react-icons/fa";
import ChatboxContactList from './ContactList';
import SearchBox from './SearchBox';

const ChatBoxContentField = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeChat, setActiveChat] = useState(15);
  const [contacts, setContacts] = useState([
    { 
      id: 15, 
      name: 'John Snow', 
      avatar: 'https://avatar.iran.liara.run/public/boy?username=Ash',
      lastMessage: 'Hello, how are you?',
      time: '4:30 PM',
      unreadCount: 3
    },
    { 
      id: 16, 
      name: 'Emma Watson', 
      avatar: 'https://avatar.iran.liara.run/public/girl?username=Emma',
      lastMessage: 'See you later',
      time: '3:45 PM',
      unreadCount: 1
    }
  ]);

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
          sender: incomingMessage.sender || 'John',
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

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen bg-blue-50">
      {/* Contacts Sidebar */}
      <div className="w-80 bg-white border-r border-blue-100 shadow-lg">
        <div className="search-box-one p-2">
          <SearchBox />
        </div>
        <ChatboxContactList />
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white p-4 shadow-sm flex items-center border-b border-blue-100">
          <img
            src="https://avatar.iran.liara.run/public/boy?username=Ash"
            alt="User avatar"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-semibold text-blue-800">John Snow</h2>
            <p className="text-sm text-green-500">Online</p>
          </div>
        </div>

        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-6 bg-blue-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'John' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`
                  max-w-xs p-3 rounded-xl 
                  ${msg.sender === 'John' 
                    ? 'bg-white text-blue-800 border border-blue-100 rounded-bl-none' 
                    : 'bg-blue-600 text-white rounded-br-none'}
                `}>
                  <p className="break-words">{msg.content}</p>
                  <div className={`text-xs text-opacity-70 text-right mt-1 
                    ${msg.sender === 'John' ? 'text-blue-500' : 'text-blue-200'}
                  `}>
                    {msg.time}
                  </div>
                </div>
              </div>
            ))}
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
      </div>
    </div>
  );
};

export default ChatBoxContentField;







