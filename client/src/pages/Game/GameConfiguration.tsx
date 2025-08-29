import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GameModeIdentifier } from "/types/single/gameMode";


export const GameConfiguration = () => {
  // Called on 'Host Lobby' button press
  const createGame = (mode: GameModeIdentifier) => {
    socket.emit("create-game", { mode });
    console.log("Game session created");
  };

  // Received when Game Session is created. Takes user to 'Host Lobby' Page
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  return (
    (
      <BlankPage>
        <div className="flex flex-row h-1/2 w-full sm:items-end lg:items-center justify-around">
          <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full"></LogoResizable>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-10 sm:space-y-30">
            <div className="flex flex-row items-center justify-center h-1/2 space-x-10">
              {/*<ButtonGeneric color="ronchi" size="large" onClick={() => createGame('battle')}>
                  <OutlineText size="large">SINGLE ROUND</OutlineText>
              </ButtonGeneric>*/}
              <ButtonGeneric color="ronchi" size="large" onClick={() => createGame(GameModeIdentifier.BATTLE_ROYALE)}>
                  <OutlineText size="large">BATTLE ROYALE</OutlineText>
              </ButtonGeneric>
            </div>
            <div className="flex flex-row items-center justify-center h-1/2 space-x-10">
              <ButtonGeneric color="ronchi" size="large" onClick={() => createGame(GameModeIdentifier.SCORING)}>
                  <OutlineText size="large">SCORED GAME</OutlineText>
              </ButtonGeneric>
            </div>
        </div>
      </BlankPage>
    )
  );
};
