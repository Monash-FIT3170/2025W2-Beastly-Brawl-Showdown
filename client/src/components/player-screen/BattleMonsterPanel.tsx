import React, { useEffect, useState } from "react";
import "./BattleMonsterPanel.css";
import { BattleState } from "/types/composite/battleState";
import { MonsterIdentifier } from "/types/single/monsterState";
import socket from "../../socket";
import { BattleMonsterImage } from "./monsters/BattleMonsterImage";
import { MonsterImage } from "./monsters/MonsterImage";

interface BattleMonsterPanelProps {
  battleState: BattleState;
  biome: string;
}

const BattleMonsterPanel: React.FC<BattleMonsterPanelProps> = ({
  battleState,
  biome: slimeString,
}) => {
  const [playerAnimations, setPlayerAnimations] = useState<string[]>([]);
  const [opponentAnimations, setOpponentAnimations] = useState<string[]>([]);

  useEffect(() => {
    type inputType = { phase: string; player: string[]; opp: string[] };
    const onUpdate = (input: inputType) => {
      setPlayerAnimations(input.player);
      setOpponentAnimations(input.opp);
      console.log(`${input.phase} - Player Animations: ${input.player}`);
      console.log(`${input.phase} - Opponent Animations: ${input.opp}`);
    };

    socket.on("update_animation", onUpdate);
    return () => socket.off("update_animation", onUpdate);
  }, []);

  useEffect(() => {
  const onAdventureState = (payload: any) => {
    if (payload.type === "battle") {
      const you = payload.battle.yourPlayer?.animations ?? [];
      const opp = payload.battle.opponentPlayer?.animations ?? [];
      setPlayerAnimations(you.filter(Boolean));
      setOpponentAnimations(opp.filter(Boolean));
    }
  };

  socket.on("adventure_state", onAdventureState);
  return () => socket.off("adventure_state", onAdventureState);
}, []);

  useEffect(() => {
  const onEventState = (payload: any) => {
    if (payload.type === "battle") {
      const you = payload.battle.yourPlayer?.animations ?? [];
      const opp = payload.battle.opponentPlayer?.animations ?? [];
      setPlayerAnimations(you.filter(Boolean));
      setOpponentAnimations(opp.filter(Boolean));
    }
  };

  socket.on("event_state", onEventState);
  return () => socket.off("event_state", onEventState);
}, []);

  return (
    <div className="fixed flex flex-col w-full h-screen justify-center pb-[50%] xl:pb-[20%] pl-[5%] xl:pl-[0%] xl:pr-[0%] pr-[5%]">
      {/* Generate 2 by 2 grid and placed monster at top right and bottom left colums */}
      <div className="w-full place-items-center xl:gap-x-[40rem] grid grid-cols-2 gap-y-[7rem] xl:gap-y-[0rem] ">
        <div></div>
        {/* Enemy Monster */}
        <BattleMonsterImage
          monster={battleState.opponentPlayerMonster.id}
          side="right"
          // statuses={oppStatuses}
          animations={opponentAnimations}
          biome={slimeString}
        ></BattleMonsterImage>

        {/*your monster*/}
        <BattleMonsterImage
          monster={battleState.yourPlayerMonster.id}
          side="left"
          // statuses={yourStatuses}
          animations={playerAnimations}
          biome={slimeString}
        ></BattleMonsterImage>
        <div></div>
      </div>
    </div>
  );
};

export default BattleMonsterPanel;
