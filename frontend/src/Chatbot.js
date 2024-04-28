import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const messageCache = new Map();
const MAX_CACHE_SIZE = 10;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const latestMessageRef = useRef('');

  // Function to handle sending the user's input to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send user's input to the backend
    if (latestMessageRef.current!== userInput) {
      const fetchResponse = await fetch('http://localhost:5001/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await fetchResponse.json();

      // Update messages with the new bot response
      setMessages([...messages, { user: 'Ghanashyam', text: userInput, timestamp: new Date() }, { bot: 'Advait', text: data.response, timestamp: new Date() }]);

      // Update messageCache
      messageCache.set(userInput, data.response);
      if (messageCache.size > MAX_CACHE_SIZE) {
        messageCache.delete(messageCache.keys().next().value);
      }
    } else {
      // Return cached response
      setMessages([...messages, { user: 'Ghanashyam', text: userInput, timestamp: new Date() }, { bot: 'Advait', text: messageCache.get(userInput), timestamp: new Date() }]);
    }

    setUserInput(''); // Clear the input field
    latestMessageRef.current = userInput;
  }

  // Scroll to the bottom of the chat window when new messages are added
  useEffect(() => {
    const chatWindow = document.querySelector('.chatbot-window');
    if (chatWindow) {
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
      <h2 class="chatbot-name">
  <span>A</span><span>D</span><span>V</span><span>A</span><span>I</span><span>T</span>
</h2>

    
      </div>
      <div className="chatbot-window">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.user? 'user-msg' : 'bot-msg'}`}>
            <div className="chatbot-message-text">
              {msg.user? `${msg.user}: ` : 'Advait: '}{msg.text}
            </div>
            <div className="chatbot-message-timestamp">
              {(new Date(msg.timestamp)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chatbot-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

function WebSearcher() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchSearchResults = async () => {
    const response = await fetch(`https://api.duckduckgo.com/?q=${searchTerm}&format=json`);
    const data = await response.json();
    setSearchResults(data.RelatedTopics);
  };

  return (
    <div className="web-searcher-container">
      <div className="question-container">
        <h3>Ask a question:</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Type your question here..."
          style={{ color: 'cyan' }}
        />
        <button type="button" onClick={fetchSearchResults}>Search</button>
      </div>
      <div className="answer-container">
        {searchResults.map((result, index) => (
          <div key={index} className="answer-item">
            <div className="answer-title">
              <strong style={{ color: 'cyan' }}>{result.Text}</strong>
            </div>
            <div className="answer-link">
              <a href={result.FirstURL} target="_blank" rel="noopener noreferrer" style={{ color: 'cyan' }}>
                {result.FirstURL}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );




  return (
    <div className="web-searcher-container">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Type your search query here..."
      />
      <button type="button" onClick={() => fetchSearchResults()}>Search</button>
      <ul>
        {searchResults.map((result, index) => (
          <li key={index}>
            <a href={result.FirstURL} target="_blank" rel="noopener noreferrer">
              {result.Text}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <Chatbot />
      <WebSearcher />
    </div>
  );
}