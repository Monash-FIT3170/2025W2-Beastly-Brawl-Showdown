import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("http://localhost:3002");

export const Chat = () => {
  const [user, setUser] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  const [loggedInUser, setLoggedInUser] = useState<string>("");
  const [loggedInRooms, setLoggedInRooms] = useState<string[]>([]);

  const [sendToRoom, setSendToRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<{ user: string; message: string }[]>(
    []
  );

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", { room, user });
      setLoggedInRooms((prevRooms) => [...prevRooms, room]);
    }
  };

  const createUser = () => {
    if (user !== "") {
      socket.emit("create_user", { user });
      setLoggedInUser(user);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { user, message, sendToRoom });

    setMessages((prevMessages) => [
      ...prevMessages,
      { user: `You (${sendToRoom})`, message: message },
    ]);
  };

  const handleMessageReceive = (data: {
    user: string;
    room: string;
    message: string;
  }) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { user: `${data.user} (${data.room})`, message: data.message },
    ]);
  };

  useEffect(() => {
    if (socket) {
      socket.on(
        "receive_message",
        (data: { user: string; room: string; message: string }) => {
          handleMessageReceive(data);
        }
      );

      return () => {
        socket.off("receive_message");
      };
    }
  }, []);
  return (
    <div>
      <h1>Chat App</h1>
      <p>User: {loggedInUser}</p>
      <p>Rooms: {loggedInRooms.join(", ")}</p>
      <div>
        <div>
          <input
            placeholder="Username..."
            onChange={(event) => {
              setUser(event.target.value);
            }}
          />
          <button onClick={createUser}> Create User</button>
        </div>
        <div>
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
        </div>

        <div>
          <input
            placeholder="Send to room..."
            onChange={(event) => {
              setSendToRoom(event.target.value);
            }}
          />
          <input
            placeholder="Message"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}>Send Message</button>
        </div>

        <div>
          <h2>Messages: </h2>
          <ul>
            {messages.map((msg, index) => (
              <li key={index}>
                <strong>{msg.user}:</strong> {msg.message}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
