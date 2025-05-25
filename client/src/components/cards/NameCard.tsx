import React from "react";
import { IconButton } from "../buttons/IconButton";
import { BaseCard } from "./BaseCard";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";
import { OutlineText } from "../texts/OutlineText";

interface NameCardProps {
  name: string;
  monster: string;
  onClick?: () => void;
}

export const NameCard = ({ name, monster, onClick }: NameCardProps) => {
  const monsterCardColour = {
    StonehideGuardian: "guardian",
    ShadowFangPredator: "predator",
    MysticWyvern: "wyvern",
    None: "quillGray",
  };

  return (
    <div className="flex flex-col justify-center items-center h-60">
      <MonsterImageResizable name={monster} width={8} height={8} />
      <BaseCard color={monsterCardColour[monster]} width={8}>
        <div className="flex flex-row items-center justify-apart space-x-4 m-2">
          <OutlineText size="tiny">{name}</OutlineText>
          <IconButton
            style="x"
            iconColour="black"
            buttonColour="red"
            onClick={onClick}
          />
        </div>
      </BaseCard>
    </div>
  );
};
