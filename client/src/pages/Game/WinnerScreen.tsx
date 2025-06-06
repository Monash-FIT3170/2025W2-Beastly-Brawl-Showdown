import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
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
      <div className="bg-peach flex items-center flex flex-col justify-around border-[4px] border-blackCurrant w-[90%] h-[75%] rounded-xl mt-[10%] xl:mt-[8%] xl: space-y-0 pl-[10%] pr-[10%] pt-[2%] text-center">
        {/* <BaseCard color="peach" width={60} height={70}> */}
        
          
            <OutlineText size="large">BETTER LUCK NEXT TIME!</OutlineText>
  
            <img className="w-[40rem] h-[40rem] xl:w-[20rem] xl:h-[20rem]" src={`/${playerMonster.id}_WIN.png`} alt={`${playerMonster.id}_WIN image`} />
  
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
          
        
        {/* </BaseCard> */}
        
      </div>

</div>
  );
};

export default WinnerScreen;