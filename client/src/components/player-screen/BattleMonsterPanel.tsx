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
  //todo: add sockets that handle which animations are which
  const [playerAnimations, setPlayerAnimations] = useState<string[]>([]);
  const [opponentAnimations, setOpponentAnimations] = useState<string[]>([]);
  const [showStatusOverlays, setShowStatusOverlays] = useState(false);

  useEffect(() => {
    type inputType = { phase: string; player: string[]; opp: string[] };
    const onUpdate = (input: inputType) => {
      setPlayerAnimations(input.player);
      setOpponentAnimations(input.opp);

      if (input.phase === "execute") {
        setShowStatusOverlays(true); // show after action resolved
      } else if (input.phase === "prepare") {
        setShowStatusOverlays(false); // hide at new round / adventure reset
      } else if (input.phase === "default") {
        setShowStatusOverlays(false); // hide at new round / adventure reset
      }
      console.log(
        `${input.phase} - Player Animations: ${input.player}`
      );
      console.log(
        `${input.phase} - Opponent Animations: ${input.opp}`
      );
    };

    socket.on("update_animation", onUpdate);
    return () => socket.off("update_animation", onUpdate);
  },[]);

  const onRollDice = (_roll: number) => setShowStatusOverlays(true);

  const shadow = `
    xl:w-[13rem]
    xl:h-[2rem]
    opacity-70
    xl:-mt-[3rem]
    xl:mb-[2rem]
    w-[30rem]
    h-[4rem]
    -mt-[7rem]
    mb-[8rem]
    z-0
    flex

    `;

  const oppStatuses = showStatusOverlays
    ? battleState.opponentPlayer.statuses
    : [];
  const yourStatuses = showStatusOverlays
    ? battleState.yourPlayer.statuses
    : [];

  return (
    <div className="fixed flex flex-col w-full h-screen justify-center pb-[50%] xl:pb-[20%] pl-[5%] xl:pl-[0%] xl:pr-[0%] pr-[5%]">
      {/* Generate 2 by 2 grid and placed monster at top right and bottom left colums */}
      <div className="w-full place-items-center xl:gap-x-[40rem] grid grid-cols-2 gap-y-[7rem] xl:gap-y-[0rem] ">
        <div></div>
        {/* Enemy Monster */}
        <BattleMonsterImage
          monster={battleState.opponentPlayerMonster.id}
          side="right"
          statuses={oppStatuses}
          animations={opponentAnimations}
          biome={slimeString}
        ></BattleMonsterImage>

        {/*your monster*/}
        <BattleMonsterImage
          monster={battleState.yourPlayerMonster.id}
          side="left"
          statuses={yourStatuses}
          animations={playerAnimations}
          biome={slimeString}
        ></BattleMonsterImage>
        <div></div>
      </div>
    </div>
  );
};

export default BattleMonsterPanel;
