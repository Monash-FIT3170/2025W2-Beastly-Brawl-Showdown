import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GameModeIdentifier } from "/types/single/gameMode";
import { IconButton } from "../../components/buttons/IconButton";
import { BaseCard } from "../../components/cards/BaseCard";
import { Slider } from "../../components/sliders/Slider";


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
        <div className="flex lg:flex-row lg:h-1/4 sm:flex-col w-full">
          <div className="flex flex-row w-1/8 sm:h-1/2 bg-red-600">
            <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
              <IconButton
                style="arrowleft"
                iconColour="black"
                buttonColour="red"
                size="medium"
                onClick={() => FlowRouter.go("/")}
              />
            </div>
          </div>
          <div className="flex flex-row lg:h-full lg:w-3/4 sm:h-3/4 lg:items-start sm:items-end justify-around bg-purple-600">
            <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
              <BaseCard color="peach" width={50} height={8}>
                <OutlineText size="extraLarge">GAME SETTINGS</OutlineText>
              </BaseCard>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-3/4 h-3/4 lg:space-y-5 sm:space-y-30 bg-white">
            <div className="flex flex-row items-center justify-center h-2/16">
              <OutlineText size="large">Game Mode:</OutlineText>
            </div>
            <div className="flex flex-row items-center justify-center h-3/16">
              <ButtonGeneric color="ronchi" size="longlarge" onClick={() => createGame(GameModeIdentifier.BATTLE_ROYALE)}>
                  <OutlineText size="large">BATTLE ROYALE</OutlineText>
              </ButtonGeneric>
            </div>
            <div className="flex flex-row items-center justify-center h-3/16">
              <ButtonGeneric color="ronchi" size="longlarge" onClick={() => createGame(GameModeIdentifier.SCORING)}>
                  <OutlineText size="large">SCORED GAME</OutlineText>
              </ButtonGeneric>
            </div>
            <div className="flex flex-row items-center justify-center h-2/16">
              <OutlineText size="large">Round Count:</OutlineText>
            </div>
            <div className="flex flex-row items-center justify-center h-6/16">
              <Slider></Slider>
            </div>
        </div>
      </BlankPage>
    )
  );
};
