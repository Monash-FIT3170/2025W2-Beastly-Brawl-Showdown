import React from "react";
import { LogoDisplay } from "../../components/logo/Logo";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";

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
      <div className="bg-peach lg:p-[1.25rem] sm:p-[3rem] h-screen w-screen flex flex-col justify-around">
        <div className="bg-goldenRod h-full outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center">
          <LogoResizable className="lg:w-1/4 sm:1/2 h-1/2"></LogoResizable> 
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
        </div>
      </div>
    )
  );
};
