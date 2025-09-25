import React from "react";
import { ArchetypeIdentifier, MonsterState } from "/types/single/monsterState";
import { MonsterIdentifier } from "/types/single/monsterState";
import { MonsterImage } from "../player-screen/monsters/MonsterImage";
import { Status } from "./status/status";

//Calculate the level of each layer
const overlayOrder: string[] = [
  "poison",
  "stun",
  "slimeBoost",
  "battleEffect",
  "damageHeal",
  "lakeBlessing",
  "lakeCurse",
  "strong",
  "weak",
] as const; //order for each status from lowest layer to highest.
const prio = new Map(overlayOrder.map((s, i) => [s, i]));

function getZLevel(status: string, z: number): number {
  const p = prio.get(status);
  const priority = p !== undefined ? p : overlayOrder.length + 999;
  return z + priority;
}

//get monster image
function getMonsterImage(
  monster: MonsterIdentifier,
  animation: string[],
  biome?: string
): string {
  //TODO: handle if we're not keeping normal monster.

  const isSlime = monster === MonsterIdentifier.SLIME;
  if (isSlime && biome) {
    return (
      "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/SLIME_" +
      biome +
      ".png"
    );
  }
  return (
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
    monster +
    ".png"
  );
}

//get status images
function getStatusOverlay(status: string): string {
  //todo create actual overlays.
  return `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/status/${status
    .replace(" ", "_")
    .toUpperCase()}.png`;
}

function splitAnimations(animations: string[]) {
  const monsterImages = ["default", "attack", "defend", "ability"];
  //todo handle if we are doing *underlays* i.e. overlays under the image.
  const monsterImage: string[] = animations.filter((a) =>
    monsterImages.includes(a)
  );
  const overlayImage: string[] = animations.filter(
    (a) => !monsterImages.includes(a)
  );
  const underlayImage: string[] = []; //handle in the future.
  return [monsterImage, overlayImage, underlayImage];
}

interface BattleMonsterImageProps {
  monster: MonsterIdentifier;
  side: "left" | "right";
  statuses: Status[];
  animations: string[];
  biome: string;
}

export const BattleMonsterImage: React.FC<BattleMonsterImageProps> = ({
  monster,
  side,
  statuses,
  animations,
  biome,
}) => {
  const monsterPath = getMonsterImage(monster, statuses, biome);
  const flip = side === "left" ? "transform -scale-x-100" : "";
  const [monsterImage, overlayImage, underlayImage] =
    splitAnimations(animations);

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
        <img src={monsterPath} alt={monster} className={`z-10 ${flip}`}></img>
        {statuses.map((status, i) => {
          const overlay = getStatusOverlay(status.name);
          const z = getZLevel(status.name, 20);
          return (
            <img
              src={overlay}
              style={{ zIndex: getZLevel(status.name, 20) }}
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
  );
};
