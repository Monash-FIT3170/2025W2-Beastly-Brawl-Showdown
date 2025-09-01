import React, { useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GameModeIdentifier } from "/types/single/gameMode";
import { IconButton } from "../../components/buttons/IconButton";
import { BaseCard } from "../../components/cards/BaseCard";
import { Slider } from "../../components/sliders/Slider";
import CardSelector from "../../components/selectors/CardSelector";
import LogoResizable from "../../components/logos/LogoResizable";

export const GameConfiguration = () => {
  // Use selectedIndex to retrieve currently selected mode.
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Use selectedValue to retrieve currently selected number of rounds.
  const [selectedValue, setSelectedValue] = useState(5);

  // Called on 'Host Lobby' button press
  const createGame = (mode: GameModeIdentifier) => {
    socket.emit("create-game", { mode });
    console.log("Game session created");
  };

  // Define the title and description of each game mode.
  const options = [
    { 
      title: "Battle Royale", 
      description: "Fight until only one player remains standing!", 
      mode: GameModeIdentifier.BATTLE_ROYALE
    },
    { 
      title: "Scored Tournament", 
      description: "Earn more points than your opponents over multiple rounds!", 
      mode: GameModeIdentifier.SCORING
    },
  ];

  const sliderDisabled = options[selectedIndex].title === "Battle Royale";

  // Received when Game Session is created. Takes user to 'Host Lobby' Page
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  return (
    (
      <BlankPage>
        <div className="flex lg:flex-row lg:h-1/4 sm:flex-col w-full">
          <div className="flex flex-row w-1/8 sm:h-1/2">
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
          <div className="flex flex-row lg:h-full lg:w-3/4 sm:h-3/4 lg:items-start sm:items-end justify-around">
            <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
              <BaseCard color="peach" width={50} height={8}>
                <OutlineText size="extraLarge">GAME SETTINGS</OutlineText>
              </BaseCard>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center w-3/4 h-3/4 lg:space-y-5 sm:space-y-30">
            <div className="flex flex-row items-center justify-center h-7/16">
              <CardSelector options={options} selectedIndex={selectedIndex} setSelectedIndex={setSelectedIndex}/>
            </div>
            <div className="flex flex-row items-center justify-center h-1/16">
              <OutlineText size="large">Round Count:</OutlineText>
            </div>
            <div className="flex flex-row items-center justify-center h-3/16">
              <Slider max={10} min= {1} selectedValue={selectedValue} setSelectedValue={setSelectedValue} isDisabled = {sliderDisabled}/>
            </div>
            <div className="flex flex-row items-center justify-center h-5/16">
              <ButtonGeneric color="ronchi" size="longlarge" onClick={() => createGame(options[selectedIndex].mode)}>
                  <OutlineText size="large">CREATE GAME</OutlineText>
              </ButtonGeneric>
            </div>
        </div>
      </BlankPage>
    )
  );
};
