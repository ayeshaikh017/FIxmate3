import { useState } from "react";
import { useSocket } from "../../context/SocketContext";
import { useAuth } from "../../context/AuthContext";

const ChatBox = () => {

  const { messages, sendMessage } = useSocket();
  const { user } = useAuth();

  const [text, setText] = useState("");

  const handleSend = () => {

    if (!text.trim()) return;

    sendMessage({
      senderId: user._id,
      message: text
    });

    setText("");
  };

  return (
    <div style={{
      position: "fixed",
      bottom: "20px",
      right: "20px",
      width: "300px",
      background: "white",
      border: "1px solid gray",
      padding: "10px",
      borderRadius: "10px",
      boxShadow: "0px 0px 10px rgba(0,0,0,0.2)"
    }}>

      <h4>Live Chat</h4>

      <div style={{
        height: "200px",
        overflowY: "auto",
        marginBottom: "10px"
      }}>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.senderId === user._id ? "Me" : "Other"} :</b>
            {msg.message}
          </div>
        ))}
      </div>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message"
        style={{ width: "70%" }}
      />

      <button onClick={handleSend}>
        Send
      </button>

    </div>
  );
};

export default ChatBox;
