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
  "miss",
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

  //TODO: handle abilities without animations!
  if (animation === "ability") {
    return (
      "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
      monsterName +
      "_" +
      animation.toUpperCase() +
      ".gif"
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

function getMonsterAnimation(animation: string): string {
  switch (animation) {
    case "attack":
      return "animate-attack";
    case "defend":
      return "animate-defend";
    case "damage":
      return "animate-damage";
    case "shield-active":
      return "animate-shield";
    case "shield-break":
      return "animate-shield-break";
    case "shield-fade":
      return "animate-shield-fade";
    default:
      return "";
  }
}

function getOverlay(animation: string): string {
  return (
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    animation.toUpperCase().replace(" ", "_") +
    ".png"
  );
}

function splitAnimations(
  animations: string[]
): [string, string, string[], string[]] {
  //MONSTER IMAGE/GIF
  const monsterOptions = ["defend", "ability", "damage", "archetype"];
  const mImage = animations.filter((a) => monsterOptions.includes(a));
  let monsterImage: string;

  if (mImage.length === 1) {
    monsterImage = mImage[0];
  } else if (mImage.length > 1) {
    console.error(
      `ANIMATION ERROR: expected only one monster image: ${mImage}`
    );
    monsterImage = mImage[0];
  } else {
    monsterImage = "default";
  }

  //ANIMATIONS
  const animationOptions = [
    "attack",
    "defend",
    "damage",
    "shield-active",
    "shield-break",
    "shield-fade",
  ];
  const aImage = animations.filter((a) => animationOptions.includes(a));
  let animationImage: string;

  if (aImage.length === 1) {
    animationImage = aImage[0];
  } else if (aImage.length > 1) {
    console.error(
      `ANIMATION ERROR: expected only one monster animation: ${aImage}`
    );
    animationImage = aImage[0];
  } else {
    animationImage = "";
  }

  //UNDERLAYS
  //todo: include underlays
  const underlayOptions = ["lake_curse"];
  const underlayImage: string[] = animations.filter((a) =>
    underlayOptions.includes(a)
  );

  //OVERLAYS
  const overlayImage: string[] = animations.filter(
    (a) => !monsterOptions.includes(a) && !underlayOptions.includes(a)
  );
  return [monsterImage, animationImage, overlayImage, underlayImage];
}

interface BattleMonsterImageProps {
  monster: MonsterIdentifier;
  side: "left" | "right";
  animations: string[];
  biome: string;
}

export const BattleMonsterImage: React.FC<BattleMonsterImageProps> = ({
  monster,
  side,
  animations,
  biome,
}) => {
  const [monsterImage, animationImage, overlayImage, underlayImage] =
    splitAnimations(animations);
  const monsterPath = getMonsterImage(monster, monsterImage, biome);
  const animation = getMonsterAnimation(animationImage);
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
    <div className={`${animation}`}>
      <div className="relative inline-block xl:w-[50%]">
        {/* Monster "Animations" */}
        <div className="relative inset-0 flex items-center justify-center">
          {underlayImage.map((item, i) => {
            const overlay = getOverlay(item);
            const z = 5;
            return (
              <img
                src={overlay}
                style={{ zIndex: z }}
                className={`
                    absolute inset-0 
                    pointer-events-none 
                    select-none 
                    ${flip}
                    `}
              />
            );
          })}
          <img src={monsterPath} alt={monster} className={`z-10 ${flip}`}></img>
          {overlayImage.map((item, i) => {
            const overlay = getOverlay(item);
            const z = getZLevel(item, 20);
            return (
              <img
                src={overlay}
                style={{ zIndex: z }}
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
      </div>
    </div>
  );
};
