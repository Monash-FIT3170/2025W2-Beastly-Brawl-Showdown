import React from "react";
import "./BattleMonsterPanel.css";
import { BattleState } from "../../../../types/composite/battleState";

interface BattleMonsterPanelProps {
  battleState: BattleState;
}

const BattleMonsterPanel: React.FC<BattleMonsterPanelProps> = ({
  battleState,
}) => {
  const pathLeftMon =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" + battleState.yourPlayerMonster.id + ".png";
  const pathRightMon =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" + battleState.opponentPlayerMonster.id + ".png";

  // console.log("Left Monster Path: ", pathLeftMon);
  // console.log("Right Monster Path: ", pathRightMon);

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

  return (
    <div className="flex flex-col w-full h-full justify-center">
      {/* Generate 2 by 2 grid and placed monster at top right and bottom left colums */}
      <div className="w-full place-items-center xl:gap-x-[40rem] grid grid-cols-2 gap-y-[7rem] xl:gap-y-[0rem] ">
        <div></div>
        <div className=" relative inline-block xl:w-[50%] ">
          <img className="relative z-10" src={pathRightMon} />
          <img className={`${shadow}`} src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/SHADOW.png"></img>
        </div>
        <div className="relative inline-block xl:w-[50%]">
          <img
            className=" relative transform -scale-x-100 z-10"
            src={pathLeftMon}
          />
          <img className={`${shadow}`} src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/SHADOW.png"></img>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default BattleMonsterPanel;
