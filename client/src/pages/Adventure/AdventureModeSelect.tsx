import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React from "react";
import socket from "../../socket";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";

export const AdventureModeSelect: React.FC = () => {
  const renderAdventureMonsterSelect = () => {
    socket.emit("adventure_level_selected", { level: 0 });
    FlowRouter.go("/adventure/monster-select");
  };

  return (
    <div
      className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
      style={{
        backgroundImage:
          "url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/FOREST.jpg')",
      }}
    >
      <div className="fixed w-full sm:h-[10vh] lg:h-[20vh] flex items-center justify-center ">
        <div className="bg-ronchi outline-blackCurrant px-[2rem] lg:outline-[0.20rem] sm:outline-[0.4rem] rounded-2xl flex flex-col items-center justify-center">
          <OutlineText size="extraLarge">CHOOSE YOUR PATH</OutlineText>
        </div>
      </div>
      <div className="flex sm:flex-col lg:flex-row items-center justify-center h-screen justify-evenly">
        <div className="sm:w-[90vw] lg:w-[40vw] sm:min-h-[30vh] lg:min-h-[40vh] bg-peach outline-blackCurrant outline-[0.2rem] rounded-2xl flex flex-col items-center justify-around text-center">
          <OutlineText size="extraLarge">CLASSIC</OutlineText>
          <BlackText size="choice-text">
            The base adventure game mode. Play through to unlock monsters!
          </BlackText>
          <ButtonGeneric
            color="blue"
            size="battle"
            onClick={() => FlowRouter.go("/adventure/level-select")}
          >
            <OutlineText size="large">SELECT</OutlineText>
          </ButtonGeneric>
        </div>
        <div className="sm:w-[90vw] lg:w-[40vw] sm:min-h-[30vh] lg:min-h-[40vh] bg-peach outline-blackCurrant outline-[0.2rem] rounded-2xl flex flex-col items-center justify-around text-center">
          <OutlineText size="extraLarge">ENDLESS</OutlineText>
          <BlackText size="choice-text">
            Test your mettle and see how far you can journey!
          </BlackText>
          <ButtonGeneric
            color="blue"
            size="battle"
            onClick={renderAdventureMonsterSelect}
          >
            <OutlineText size="large">SELECT</OutlineText>
          </ButtonGeneric>
        </div>
      </div>
    </div>
  );
};
