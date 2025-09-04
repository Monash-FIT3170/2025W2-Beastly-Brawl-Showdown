import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { BaseCard } from "../../components/cards/BaseCard";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import React, { useEffect, useState } from "react";
import {
  ArchetypeIdentifier, ArchetypeInfo, MonsterIdentifier, MonsterState,
} from "../../../../types/single/monsterState";
import { MonsterImage } from "../../components/player-screen/monsters/MonsterImage";
import { getMonster } from "/server/src/model/game/monster/monsterMap";

interface AdventureWinProp{

}

const AdventureWin: React.FC = () => {
  const [monster, setMonster] = useState<MonsterState | null>(null);

  useEffect(() => {
    const monsterId = FlowRouter.getParam("monsterId") as string | undefined;
    if (!monsterId) return;

    socket.emit("monster_request", { id: monsterId });

    const onMonster = (m: MonsterState) => setMonster(m);
    socket.on("monster_response", onMonster);
    
    return () => {
      socket.off("monster_response", onMonster);
    };
  }, [FlowRouter.getParam("monsterId")]);
  // const monster = FlowRouter.getParam("monsterId") as MonsterIdentifier | undefined;

  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/adventure/level-select");
  };

  const colorLoader: Record<string, string> = {
      [ArchetypeIdentifier.ATTACKER]: "bg-[#DC7466]",
      [ArchetypeIdentifier.DEFENDER]: "bg-[#7EACD5]",
      [ArchetypeIdentifier.BALANCED]: "bg-[#9DD786]",
    };

  if (!monster) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <OutlineText size="large">Loading reward</OutlineText>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-ronchi ">
      <GenericHeader color="blue">
        <OutlineText size="extraLarge">NEW MONSTER!</OutlineText>
      </GenericHeader>
      <div className="bg-peach flex items-center flex flex-col justify-around border-[6px] border-blackCurrant w-[90%] h-[75%] rounded-xl mt-[10%] xl:mt-[8%] xl: space-y-0 pl-[10%] pr-[10%] pt-[2%] text-center">
        <OutlineText size="large">YOU'VE UNLOCKED</OutlineText>

        <div className={`bg-[#FFA600] flex flex-col items-center justify-around border-[6px] border-blackCurrant w-[40rem] h-[50rem] xl:w-[20rem] xl:h-[20rem] rounded-xl`}>
          
          <MonsterImage
            name={monster.id}
            className="sm:w-[30rem] sm:h-[30rem] lg:w-[15rem] lg:h-[15rem]"
          />
          <OutlineText size="large">{monster.name}</OutlineText>
        </div>
        <ButtonGeneric color="blue" size="medium" onClick={() => leave()}>
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <div>
              <OutlineText size="medium">CONTINUE</OutlineText>
            </div>
          </div>
        </ButtonGeneric>
      </div>
    </div>
  );
};

export default AdventureWin;
