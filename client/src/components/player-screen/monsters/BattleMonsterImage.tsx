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
  "crit",
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
  animation: string,
  biome?: string
): string {
  let monsterName = monster;
  if (monster === MonsterIdentifier.SLIME && biome) {
    monsterName = `SLIME_${biome}`;
  }

  if (animation === "default") {
    return (
      "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/" +
      monsterName +
      ".png"
    );
  }
  const image =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    monsterName +
    "_" +
    animation.toUpperCase() +
    ".png";
  return image;
}

//get status images
function getStatusOverlay(status: string): string {
  //todo create actual overlays.
  return `https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/status/${status
    .replace(" ", "_")
    .toUpperCase()}.png`;
}

function getOverlay(animation: string): string {
  return (
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    animation.toUpperCase() +
    ".png"
  );
}

function splitAnimations(animations: string[]): [string, string[], string[]] {
  const monsterOptions = ["attack", "defend", "ability", "damage", "archetype"];
  const matched = animations.filter((a) => monsterOptions.includes(a));
  let monsterImage: string;

  if (matched.length === 1) {
    monsterImage = matched[0];
  } else if (matched.length > 1) {
    console.error(
      `ANIMATION ERROR: expected only one monster image: ${matched}`
    );
    monsterImage = matched[0];
  } else {
    monsterImage = "default";
  }
  const underlayOptions = ["underlayexample"];
  const underlayImage: string[] = []; //TODO: handle in the future.

  const overlayImage: string[] = animations.filter(
    (a) => !monsterOptions.includes(a) && !underlayOptions.includes(a)
  );
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
  const [monsterImage, overlayImage, underlayImage] =
    splitAnimations(animations);
  const monsterPath = getMonsterImage(monster, monsterImage, biome);
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
        <img src={monsterPath} alt={monster} className={`z-10 ${flip}`}></img>
        {/* will need to update to use actual overlays (once they exist) e.g. getOverlay()*/}
        {overlayImage.map((item, i) => {
          const overlay = getStatusOverlay(item);
          const z = getZLevel(item, 20);
          return (
            <img
              src={overlay}
              style={{ zIndex: getZLevel(item, 20) }}
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
