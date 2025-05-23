import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";

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
      <BlankPage> 
        <div className="flex flex-row h-1/2 w-full items-center justify-around">
          <LogoResizable className="lg:w-1/4 sm:1/2 h-full"></LogoResizable> 
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-10 sm:space-y-30">
          <ButtonGeneric color="ronchi" size="large" onClick={createGame}>
            <OutlineText size="large">
              Host Game
            </OutlineText> 
          </ButtonGeneric>
          <ButtonGeneric color="ronchi" size="large" onClick={renderJoinLobby}>
            <OutlineText size="large">
              Join Game
            </OutlineText>
          </ButtonGeneric>
        </div>
      </BlankPage>
    )
  );
};
