import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import React, { useEffect, useState } from "react";
import { MonsterState } from "/types/single/monsterState";

//
const LoserScreen: React.FC = () => {
  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });

  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/");
  };

  return (
    // <div>
    //   You Lost!
    // </div>
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-ronchi ">
      <GenericHeader color="red">
        <OutlineText size="extraLarge">DEFEATED!</OutlineText>
      </GenericHeader>
      <div className="bg-peach flex items-center flex flex-col justify-around border-[4px] border-blackCurrant w-[90%] h-[75%] rounded-xl mt-[10%] xl:mt-[8%] xl: space-y-0 pl-[10%] pr-[10%] pt-[2%] text-center">
        {/* <BaseCard color="peach" width={60} height={70}> */}

        {/* <div className="flex flex-col items-center justify-center space-y-1"> */}
        {/* <OutlineText size="large">BETTER LUCK</OutlineText>
            <OutlineText size="large">NEXT TIME!</OutlineText> */}

        <OutlineText size="large">BETTER LUCK NEXT TIME!</OutlineText>

        {/* <img style={{ width: `${40}rem xl:${30}rem`, height: `${40}rem xl:${30}rem` }} src={`/GRAVE.png`} alt={`GRAVE image`} /> */}
        <img
          className="w-[40rem] h-[40rem] xl:w-[20rem] xl:h-[20rem]"
          src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/ending/GRAVE.png`}
          alt={`GRAVE image`}
        />

        <ButtonGeneric color="red" size="medium" onClick={() => leave()}>
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <div>
              <OutlineText size="medium">EXIT LOBBY</OutlineText>
            </div>
          </div>
        </ButtonGeneric>
        {/* </div> */}

        {/* </BaseCard> */}
      </div>
    </div>
  );
};

export default LoserScreen;
