import { useEffect, useState } from "react";
import React from "react";
import Pusher from "pusher-js";
import axios from "axios";

function App() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  let allMessages = [];
  useEffect(() => {
    console.log("called");
    // Pusher.logToConsole = true;

    const pusher = new Pusher("4da74743cb3e0245215d", {
      cluster: "ap3",
    });

    const channel = pusher.subscribe("chat");
    channel.bind("message", function (data) {
      console.log(data);
      allMessages.push(data);
      setMessages(allMessages);
    });
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8000/api/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        message,
      }),
    });
  };

  return (
    <div className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white">
      <a className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
        <span className="fs-5 fw-semibold">List group</span>
        <input
          className="fs-5"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
      </a>
      <div className="list-group list-group-flush border-bottom">
        {messages.map((message) => (
          <a
            className="list-group-item list-group-item-action py-3 lh-sm"
            aria-current="true"
          >
            <div className="d-flex w-100 align-items-center justify-content-between">
              <strong className="mb-1">List group item heading</strong>
              <small>yo</small>
            </div>
            <div className="col-10 mb-1 small">{message}</div>
          </a>
        ))}
      </div>
      <form onSubmit={submit}>
        <input
          className="form-control"
          placeholder="Write a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></input>
      </form>
    </div>
  );
}

export default App;
