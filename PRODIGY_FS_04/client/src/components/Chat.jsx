import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server address

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    // Socket.IO event listeners
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      // Cleanup on component unmount
      socket.off('message');
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message = { text: messageInput, timestamp: new Date() };
      socket.emit('message', message);
      setMessageInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className="message-item">
              <div className="message">{msg.text}</div>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Type your message..."
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <button
            className="send-button"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
