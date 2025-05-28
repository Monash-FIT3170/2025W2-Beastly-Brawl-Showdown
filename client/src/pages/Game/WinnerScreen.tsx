import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import React, { useEffect, useState } from "react";
import { MonsterState } from "/types/single/monsterState";

interface WinningScreenProps {
  playerMonster: MonsterState|null;
}

const WinnerScreen: React.FC<WinningScreenProps> = ({playerMonster}) => {

  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    FlowRouter.go("/");
  });

  const leave = () => {
    socket.emit('leave-game', {userID:socket.id})
    FlowRouter.go("/")
  };

  // const leave = () => {
  //   socket.emit('leave-game', {userID:socket.id})
  //   FlowRouter.go("/")
  // };

  if (!playerMonster) {
    return (
    <BlankPage >
      <div className='w-115 h-30'>
        <div className='items-center'>
          <OutlineText size="medium">ERROR PLEASE RETURN TO HOME</OutlineText>
        </div>
      </div>
      <ButtonGeneric
        color="red"
        size="medium"
        onClick={() => leave()}
      >
        <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
          <div>
            <OutlineText size="medium">EXIT LOBBY</OutlineText>
          </div>
        </div>
      </ButtonGeneric>

    </BlankPage>
    )
  }

  return (
    // <div>
    //   You won!
    // </div>
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-ronchi">
          
      <GenericHeader color="blue">
        <OutlineText size="extraLarge">VICTORY!</OutlineText>
      </GenericHeader>
      <div className="bg-peach flex items-center justify-around border-[4px] border-blackCurrant w-[90%] h-[80%] rounded-xl mt-[10%]">
        {/* <BaseCard color="peach" width={60} height={70}> */}
        
          <div className="flex flex-col items-center justify-center">
            <OutlineText size="large">YOU ARE THE</OutlineText>
            <OutlineText size="large">WINNER!</OutlineText>
  
            <img style={{ width: `${40}rem`, height: `${40}rem` }} src={`/${playerMonster.id}_WIN.png`} alt={`${playerMonster.id}_WIN image`} />
  
            <ButtonGeneric
              color="red"
              size="medium"
              onClick={() => leave()}
            >
              <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
                <div>
                  <OutlineText size="medium">EXIT LOBBY</OutlineText>
                </div>
              </div>
            </ButtonGeneric>
          </div>
        
        {/* </BaseCard> */}
        
      </div>

</div>
  );
};

export default WinnerScreen;