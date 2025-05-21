import React, { useEffect, useState } from "react";
import { ButtonDemo } from "../../components/buttons/Button";
import { LogoDisplay } from "../../components/logo/Logo";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import io from "socket.io-client";
import socket from "../../socket";

interface JoinLobbyProps {
  gameCode?: string;
}

const JoinLobby: React.FC<JoinLobbyProps> = ({ gameCode }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  // On mount, prefill code from prop
  useEffect(() => {
    if (gameCode) {
      setCode(gameCode);
    }
  }, [gameCode]);

  const joinSession = () => {
    socket.emit("join-game", { gameCode: code, name: name });
  };

  //to be moved to lobby
  const leaveSession = () => {
    socket.emit("leave-game", { userID: socket.id });
  };

  //to move this to the player lobby once connected
  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    //reroute to home or join page or whatever
    FlowRouter.go("/*");
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8 sm:px-6 lg:px-8">
      <button
        onClick={() => FlowRouter.go("/")}
        className="absolute top-4 left-4 bg-red-400 text-black px-4 py-3 rounded hover:bg-red-500 text-3xl font-bold"
      >
        ←
      </button>

      <LogoDisplay size="3xl" />

      <div className="w-full max-w-xs mb-6">
        <h3 className="text-left text-xl font-bold mb-2">
          Please Enter Room Code:
        </h3>
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={6}
          value={code}
          onChange={(e) => {
            const numericValue = e.target.value.replace(/\D/g, ""); // remove non-digits
            setCode(numericValue);
          }}
          className="border-2 border-green-500 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter 6-Digit Code"
        />
      </div>

      <div className="w-full max-w-xs mb-6">
        <h3 className="text-left text-xl font-bold mb-2">Name:</h3>
        <input
          type="text"
          maxLength={20}
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border-2 border-green-500 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Enter Your Name"
        />
      </div>

      <div className="mt-8">
        <ButtonDemo text="JOIN ROOM" onClick={joinSession} />
      </div>
      <div className="mt-8">
        <ButtonDemo text="LEAVE ROOM (TEST)" onClick={leaveSession} />
      </div>
    </div>
  );
};

export default JoinLobby;
