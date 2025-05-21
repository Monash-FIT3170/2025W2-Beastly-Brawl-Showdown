import React from "react";
import { ButtonDemo } from "../../components/buttons/Button";
import { LogoDisplay } from "../../components/logo/Logo";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
// import { io } from "socket.io-client";
import socket from "../../socket";

export const Home = () => {
  // const renderHostLobby = () => {
  //   // FlowRouter.go("/host");
  // };

  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  const renderJoinLobby = () => {
    FlowRouter.go("/join");
  };

  return (
    console.log("Home"),
    (
      <div>
        <LogoDisplay size="3xl" />
        <ButtonDemo text="Host Lobby" onClick={createGame} />
        <ButtonDemo text="Join Lobby" onClick={renderJoinLobby} />
      </div>
    )
  );
};
