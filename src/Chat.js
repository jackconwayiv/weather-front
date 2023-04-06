import axios from "axios";
import { useEffect, useState } from "react";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://weather-api-acj3.onrender.com/chat"
    : "http://localhost:8080/chat";

const Chat = ({ city, state, weather }) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userContent, setUserContent] = useState("");

  useEffect(() => {
    const firstQuestion = `Hello from ${city}, ${state}! Today's weather here is: ${weather} What are some fun things I could do in my area?`;
    if (weather) {
      const initialQuery = async () => {
        let newMessage = { role: "user", content: firstQuestion };
        let newMessages = [newMessage];
        setMessages(newMessages);
        try {
          setLoading(true);
          let res = await axios.post(`${API_URL}`, {
            messages: newMessages,
          });
          setMessages([...newMessages, res.data.completion]);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      initialQuery();
    }
  }, [city, state, weather]);

  const renderMessages = () => {
    if (loading) {
      return <p>loading</p>;
    }
    return (
      <>
        {messages.map((message, i) => (
          <div
            key={i}
            className={message.role === "user" ? "userChat" : "botChat"}
          >
            {message &&
              message.content &&
              message.content
                .split("\n")
                .map((line, k) => <p key={k}>{line}</p>)}
          </div>
        ))}
      </>
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newMessage = { role: "user", content: userContent };
    let oldMessages = [...messages];
    let newMessages = [...oldMessages, newMessage];
    setMessages(newMessages);
    try {
      setLoading(true);
      let res = await axios.post(`${API_URL}`, {
        messages: newMessages,
      });
      setMessages([newMessage, res.data.completion, ...oldMessages]);
      setUserContent("");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>A.I. TRAVEL AGENT</h2>
      <p>Ask for travel recommendations!</p>
      <p>
        NOTE: This AI may not have the most recent information -- be sure to
        phone ahead!
      </p>
      <form onSubmit={handleSubmit}>
        <input
          value={userContent}
          onChange={(event) => setUserContent(event.target.value)}
        />
        <button disabled={loading}>{loading ? "loading" : "ask"}</button>
      </form>
      {renderMessages()}
    </div>
  );
};

export default Chat;
