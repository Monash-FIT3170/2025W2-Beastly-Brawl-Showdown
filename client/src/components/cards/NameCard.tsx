import React from "react";
import { IconButton } from "../buttons/IconButton";
import { BaseCard } from "./BaseCard";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";
import { OutlineText } from "../texts/OutlineText";
import { PlayerState } from "/types/single/playerState";
import { MonsterIdentifier } from "/types/single/monsterState";

interface NameCardProps {
  player: PlayerState;
  onClick?: () => void;
}

export const NameCard = ({ player, onClick }: NameCardProps) => {
  const monsterCardColour = {
    [MonsterIdentifier.STONEHIDE_GUARDIAN]: "guardian",
    [MonsterIdentifier.SHADOWFANG_PREDATOR]: "predator",
    [MonsterIdentifier.MYSTIC_WYVERN]: "wyvern",
    None: "quillGray",
  };

  return (
    <div className="flex flex-col justify-center items-center h-60">
      <MonsterImageResizable
        name={player.monster?.id ?? "None"}
        width={8}
        height={8}
      />
      <BaseCard
        color={monsterCardColour[player.monster?.id ?? "None"]}
        width={8}
      >
        <div className="flex flex-row items-center justify-apart space-x-4 m-2">
          <OutlineText size="tiny">{player.name}</OutlineText>
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
