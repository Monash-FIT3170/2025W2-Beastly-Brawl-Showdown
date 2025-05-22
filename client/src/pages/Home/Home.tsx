import React from "react";
import { LogoDisplay } from "../../components/logo/Logo";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";

export const Home = () => {
  // Called on 'Host Lobby' button press
  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  // Received when Game Session is created. Takes user to 'Host Lobby' Page
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  // Called on 'Join Lobby' button press
  const renderJoinLobby = () => {
    FlowRouter.go("/join");
  };

  return (
    console.log("Home"),
    (
      <div>
        <LogoDisplay size="3xl" />
        <button onClick={createGame}>Host Game</button>
        <button onClick={renderJoinLobby}>Join Game</button>
      </div>
    )
  );
};
