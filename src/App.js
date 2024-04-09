import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [users, setUsers] = useState({
    user1: { name: 'User 1', messages: [] },
    user2: { name: 'User 2', messages: [] },
  });
  const [currentUser, setCurrentUser] = useState('user1');
  const [inputMessage, setInputMessage] = useState('');
  const [inputImage, setInputImage] = useState(null);

  const handleMessageSend = () => {
    if (inputMessage.trim() !== '' || inputImage) {
      const message = { text: inputMessage, sender: users[currentUser].name };
      if (inputImage) {
        const reader = new FileReader();
        reader.onload = (e) => {
          message.image = e.target.result;
          setUsers({
            ...users,
            [currentUser]: { ...users[currentUser], messages: [...users[currentUser].messages, message] },
          });
        };
        reader.readAsDataURL(inputImage);
        setInputImage(null);
      } else {
        setUsers({
          ...users,
          [currentUser]: { ...users[currentUser], messages: [...users[currentUser].messages, message] },
        });
      }
      setInputMessage('');
    }
  };

  const handleImageUpload = (event) => {
    setInputImage(event.target.files[0]);
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        {users[currentUser].messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 ${message.sender === users.user1.name ? 'bg-blue-200' : 'bg-gray-200'} rounded-lg mb-2`}
          >
            <div>{message.text}</div>
            {message.image && <img src={message.image} alt="Shared" className="mt-2 max-w-xs" />}
          </div>
        ))}
      </div>
      <div className="flex items-center mb-4">
        <input
          type="text"
          className="flex-1 border rounded-l-lg p-2 mr-2"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <input type="file" onChange={handleImageUpload} />
        <button className="bg-blue-500 text-white rounded-r-lg px-4" onClick={handleMessageSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
