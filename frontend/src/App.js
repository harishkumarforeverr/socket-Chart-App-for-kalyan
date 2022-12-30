import "./App.css";

import { useState, useEffect } from "react";
import io from "socket.io-client";
import { nanoid } from "nanoid";

// no dotenv
const socket = io.connect("http://localhost:5000");
const userName = nanoid(4);

function App() {
  const [message2, setMessage2] = useState("");
  const [chat, setChat] = useState([]);

  const sendChatAll = (e) => {
    e.preventDefault();
    socket.emit("userAll", { message2, userName });
    setMessage2("");
  };

  useEffect(() => {
    socket.on("userAll", (payload) => {
      console.log("payload", payload);
      setChat((prev) => [
        ...prev,
        {
          message: payload.message2,
          userName: "kalyan" + payload.userName,
        },
      ]);
    });
  }, [socket]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Charting app</h1>

        {chat.map((payload, index) => {
          return (
            <p
              style={{
                position: "relative",
              }}
              key={index}
            >
              {payload.message}{" "}
              {payload.userName && (
                <span className="userid"> {payload.userName}</span>
              )}
            </p>
          );
        })}

        <form onSubmit={sendChatAll}>
          <h4> Socket IO event for all the user</h4>{" "}
          <input
            type="text"
            name="chat"
            placeholder="send text"
            value={message2}
            onChange={(e) => {
              setMessage2(e.target.value);
            }}
          />
          <button type="submit">Send</button>
        </form>
      </header>
    </div>
  );
}

export default App;
