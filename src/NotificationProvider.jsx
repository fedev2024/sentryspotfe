
import React, { useEffect, useState } from 'react';

const NotificationProvider = () => {
  const [messages, setMessages] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState('Connecting...');

  useEffect(() => {
    const eventSourceUrl = 'https://api.sentryspot.co.uk/api/sse/notifications';
    let eventSource;
   console.log(eventSourceUrl,"eventSourceUrl");
    try {
      eventSource = new EventSource(eventSourceUrl,{
        withCredentials: true,
      });

      // Log when the connection is successfully opened
      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setConnectionStatus('Connected to notifications.');
      };

      // Log messages received from the server
      eventSource.onmessage = (event) => {
        console.log('Received message:', event.data);
        setMessages((prev) => [...prev, event.data]);
      };

      // Handle errors
      eventSource.onerror = () => {
        console.error('SSE connection error');
        setConnectionStatus('Failed to connect. Retrying...');
        eventSource.close(); // Close the connection on error
      };
    } catch (error) {
      console.error('Error initializing SSE:', error);
      setConnectionStatus('Error initializing notifications.');
    }

    // Cleanup when the component unmounts
    return () => {
      if (eventSource) {
        eventSource.close();
        console.log('SSE connection closed');
      }
    };
  }, []);

  return (
    <div>
      <div style={{ margin: '10px 0' }}>{connectionStatus}</div>
      <div>
        <h4>Messages:</h4>
        {messages.length === 0 && <p>No messages received yet.</p>}
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
    </div>
  );
};

export default NotificationProvider;
