import axios from "axios";
import { useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://weather-api-acj3.onrender.com/chat"
    : "http://localhost:8080/chat";

const Chat = () => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userContent, setUserContent] = useState("");

  const renderMessages = () => {
    if (loading) {
      return <p>loading</p>;
    }
    return (
      <div>
        {messages.map((line, i) => (
          <p key={i}>{line}</p>
        ))}
      </div>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      let res = await axios.post(`${API_URL}`, {
        message: { role: "user", content: userContent },
      });
      setMessages(res.data.completion.content.split("\n"));
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>RIDDLE CHAT-GPT THIS:</h2>
      <p>Go ahead. Ask a question.</p>
      <form onSubmit={handleSubmit}>
        <input
          value={userContent}
          onChange={(event) => setUserContent(event.target.value)}
        />
        <button>{loading ? "loading" : "ask"}</button>
      </form>
      {renderMessages()}
    </div>
  );
};

export default Chat;
