import React, { useEffect, useState } from "react";
import "./BattleMonsterPanel.css";
import { BattleState } from "/types/composite/battleState";
import { MonsterIdentifier } from "/types/single/monsterState";
import socket from "../../socket";

interface BattleMonsterPanelProps {
  battleState: BattleState;
  biome: string;
}

const BattleMonsterPanel: React.FC<BattleMonsterPanelProps> = ({
  battleState,
  biome: slimeString,
}) => {
  const playerPath =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    battleState.yourPlayerMonster.id +
    ".png";
  var opponentPath =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    battleState.opponentPlayerMonster.id +
    ".png";

  var pathTest =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME_ARCTIC.png";

  //checks if enemy is a slime - then uses biome specific variant
  //note: slimes can only be enemies
  // TODO: UPDATE SLIMES TO BE IN DIGITAL OCEAN
  if (battleState.opponentPlayerMonster.id == MonsterIdentifier.SLIME) {
    opponentPath =
      "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME_" +
      slimeString +
      ".png";
  }

  //todo: add sockets that handle which animations are which
  const [playerAnimations, setPlayerAnimations] = useState(["default", "test"]);
  const [opponentAnimations, setOpponentAnimations] = useState([
    "default",
    "test",
  ]);

  console.log("Player", playerAnimations);
  console.log("Opponent", opponentAnimations);

  useEffect(() => {
    socket.on("update_animation", (set: string) => {
      if (set === "prepare") {
        console.log("Prepare Animations Update");
        console.log(
          "Your Prepare Animations:",
          battleState.yourPlayer.prepareAnimations
        );
        const opponentAnimations = battleState.opponentPlayer.prepareAnimations;
        const playerAnimations = battleState.yourPlayer.prepareAnimations;
        setOpponentAnimations(opponentAnimations);
        setPlayerAnimations(playerAnimations);
      } else if (set == "execute") {
        console.log("Execute Animations Update");
        console.log(
          "Your Execute Animations:",
          battleState.yourPlayer.executeAnimations
        );
        const opponentAnimations = battleState.opponentPlayer.executeAnimations;
        const playerAnimations = battleState.yourPlayer.executeAnimations;
        setOpponentAnimations(opponentAnimations);
        setPlayerAnimations(playerAnimations);
      } else if (set == "default") {
        console.log("Default Animations Update");
        setOpponentAnimations(["default"]);
        setPlayerAnimations(["default"]);
      }
    });

    return () => {
      socket.off("update_animation");
    };
  });

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
    <div className="fixed flex flex-col w-full h-screen justify-center pb-[50%] xl:pb-[20%] pl-[5%] xl:pl-[0%] xl:pr-[0%] pr-[5%]">
      {/* Generate 2 by 2 grid and placed monster at top right and bottom left colums */}
      <div className="w-full place-items-center xl:gap-x-[40rem] grid grid-cols-2 gap-y-[7rem] xl:gap-y-[0rem] ">
        <div></div>
        {/* Enemy Monster */}
        <div className=" relative inline-block xl:w-[50%] ">
          <div
            className={`${
              opponentAnimations.includes("default") ? "" : "hidden"
            } z-10`}
          >
            <img className="relative z-10" src={opponentPath} />
          </div>

          <img
            className={`${shadow}`}
            src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/SHADOW.png"
          ></img>
        </div>
        {/* Left Monster */}
        <div className=" relative inline-block xl:w-[50%]">
          {/* Monster "Animations" */}
          <div className="relative inset-0 flex items-center justify-center">
            {/* Default Monster Image */}
            <div
              className={`${
                playerAnimations.includes("default") ? "" : "hidden"
              } z-10`}
            >
              <img
                className=" transform -scale-x-100 z-10"
                src={playerPath}
              />
            </div>
            {/* Testing Monster Image */}
            <div
              className={`${
                playerAnimations.includes("test") ? "" : "hidden"
              } absolute z-20`}
            >
              <img
                className="  transform -scale-x-100 z-20"
                src={pathTest}
              />
            </div>
            {/* Testing Monster Image */}
            <div
              className={`${
                playerAnimations.includes("stun") ? "" : "hidden"
              } absolute z-100`}
            >
              <img
                className=" relative transform -scale-x-100"
                src={getStatusOverlay("stun")}
              />
            </div>
          </div>
          {/* Shadow */}
          <img
            className={`${shadow}`}
            src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/SHADOW.png"
          ></img>
        </div>
        <div></div>
      </div>
    </div>
  );
};

function getStatusOverlay(status: string): string {
  return `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/status/${status
    .replace(" ", "_")
    .toUpperCase()}.png`;
}

function getAbilityOverlay(monster: MonsterIdentifier): string {
  return (
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    monster +
    "_ABILITY.png"
  );
}

export default BattleMonsterPanel;
