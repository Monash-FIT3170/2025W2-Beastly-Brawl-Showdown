import React from "react";
import { ArchetypeIdentifier, MonsterState } from "/types/single/monsterState";
import { MonsterIdentifier } from "/types/single/monsterState";
import { MonsterImage } from "../player-screen/monsters/MonsterImage";
import { Status } from "./status/status";

//get status images
function getStatusOverlay(status: string): string {
  return `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/status/${status
    .replace(" ", "_")
    .toUpperCase()}.png`;
}

//Calculate the level of each layer
const order = [ "poison", "stun", "slimeBoost", "battleEffect", "damageHeal", "lakeBlessing", "lakeCurse", "strong", "weak"] as const; //order for each status from lowest layer to highest.
const prio = new Map(order.map((s, i) => [s, i]));

function getLevel(status, z): number {
  const p = prio.get(status);
  const priority = p !== undefined ? p : order.length + 999;
  return z + priority;
}

interface BattleMonsterImageProps{
    monster: MonsterIdentifier;
    side: "left" | "right";
    statuses: Status[];
    slimeBiomeVariant?: string;
}


export const BattleMonsterImage: React.FC<BattleMonsterImageProps> = ({monster, side, statuses, slimeBiomeVariant}) => {
    
    const isSlime = monster === MonsterIdentifier.SLIME;

    const playerPath =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    monster +
    ".png";


    const slimePath = isSlime && slimeBiomeVariant?
        "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME_" + slimeBiomeVariant + ".png" : undefined;


    const flip = side === "left" ? "transform -scale-x-100" : "";



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

        <div className=" relative inline-block xl:w-[50%]">
          {/* Monster "Animations" */}
          <div className="relative inset-0 flex items-center justify-center">
            {isSlime ? (
                <img
                    src={slimePath}
                    alt="SLIME"
                    className={`z-10 ${flip}`}
                />
                ) : (
                <img
                    src={playerPath}
                    className={`z-10 ${flip}`}
                />
                )}
            {statuses.map((status, i) => {
                
                const overlay = getStatusOverlay(status.name);
                const z = getLevel(status.name, 20)
                return (
                <img
                    src={overlay}
                    style={{ zIndex: getLevel(status.name, 20) }}
                    className={`
                    absolute inset-0 
                    pointer-events-none 
                    select-none 
                    ${flip}
                    `}
                />
                );
            })}
          </div>
          {/* Shadow */}
          <img
            className={`${shadow}`}
            src="https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/SHADOW.png"
          ></img>
        </div>

    )
}