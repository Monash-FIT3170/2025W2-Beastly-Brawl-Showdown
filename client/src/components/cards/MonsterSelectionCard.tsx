import React from "react";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";
import { MonsterState } from "/types/single/monsterState";
import { MonsterImage } from "../player-screen/monsters/MonsterImage";

interface MonsterSelectionProps {
  monster: MonsterState;
  type: string;
  onClick: () => void;
}

export const MonsterSelectionCard = ({
  monster,
  type,
  onClick,
}: MonsterSelectionProps) => {
  const colorLoader: Record<string, string> = {
    "Pouncing Bandit": "bg-[#DC7466]",
    "Rocky Rhino": "bg-[#7EACD5]",
    "Cinder Tail": "bg-[#9DD786]",
    "Killing Bluey": "bg-[#A0C4FF]",
    "Poison Frog": "bg-[#B9FBC0]",
    "Charmer Cobra": "bg-[#FFE156]",
  };

  return (
    <button
      className={`${colorLoader[monster.name]} 
                border border-[4px] border-blackCurrant 
                rounded-xl
                sm:w-[95%]
                lg:w-[70%]
                flex flex-row items-center
                min-h-[17rem]`}
      onClick={onClick}
    >
      <div className="flex flex-col shrink-0 justify-center items-center">
        <MonsterImage
          name={monster.id}
          className="sm:w-[20rem] sm:h-[20rem] lg:w-[15rem] lg:h-[15rem]"
        />
      </div>
      <div className="flex flex-col text-center grow">
        <p className="text-outline sm:text-[4rem] lg:text-[4rem] font-[Jua]">
          {monster.name}
        </p>
        <BlackText size="medium">{monster.description}</BlackText>
      </div>
    </button>
  );
};
