import React, { useState } from "react";
import "./ChatLectro.css";

function ChatLectro() {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = { sender: "You", text: message };
    setChatHistory((prev) => [...prev, userMsg]);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMsg = { sender: "Cheffie 🍳", text: data.response };
      setChatHistory((prev) => [...prev, botMsg]);
      setMessage("");
    } catch {
      const errorMsg = { sender: "Cheffie 🍳", text: "⚠️ Failed to connect to server." };
      setChatHistory((prev) => [...prev, errorMsg]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chat-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "×" : "💬 Chat with Cheffie"}
      </button>

      {/* Popup Chat Box */}
      {isOpen && (
        <div className="chat-popup">
          <div className="chat-header">👩‍🍳 Cheffie - Your Meal Assistant</div>
          <div className="chat-body">
            {chatHistory.map((msg, index) => (
              <div key={index} className={`chat-msg ${msg.sender === "You" ? "user" : "bot"}`}>
                <strong>{msg.sender}:</strong> <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatLectro;
