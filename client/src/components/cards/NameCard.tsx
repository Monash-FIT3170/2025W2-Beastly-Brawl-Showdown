import React from "react";
import { IconButton } from "../buttons/IconButton";
import { BaseCard } from "./BaseCard";
import { MonsterImageResizable } from "../player-screen/monsters/MonsterImageResizable";
import { BlackText } from "../texts/BlackText";
import { PlayerState } from "/types/single/playerState";
import { MonsterIdentifier } from "/types/single/monsterState";
import { ArchetypeIdentifier } from "../../../../types/single/monsterState";

interface NameCardProps {
  player: PlayerState;
  onClick?: () => void;
}

export const NameCard = ({ player, onClick }: NameCardProps) => {
  const colourLoader: Record<ArchetypeIdentifier | string, string> = {
    [ArchetypeIdentifier.ATTACKER]: "attacker",
    [ArchetypeIdentifier.DEFENDER]: "defender",
    [ArchetypeIdentifier.BALANCED]: "balanced",
    NONE: "quillGray",
  };

  return (
    <div className="flex flex-col justify-center items-center h-60">
      <MonsterImageResizable
        name={player.monster?.id ?? "NONE"}
        width={8}
        height={8}
      />
      <BaseCard
        color={colourLoader[player.monster?.archetypeId ?? "NONE"]}
        width={8}
      >
        <div className="flex flex-row items-center justify-apart space-x-4 m-2">
          <BlackText size="tiny">{player.name}</BlackText>
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
