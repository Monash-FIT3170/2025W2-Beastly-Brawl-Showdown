import React from "react";
import { ArchetypeIdentifier, MonsterState } from "/types/single/monsterState";
import { MonsterIdentifier } from "/types/single/monsterState";
import { MonsterImage } from "../player-screen/monsters/MonsterImage";
import { Status } from "./status/status";

//Calculate the level of each layer
const overlayOrder: string[] = [
  "shield",
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

function getOverlay(overlay: string): string {
  return (
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    overlay.toUpperCase().replace(" ", "_") +
    ".png"
  );
}

//TODO: update defend/shield animations depending on what art Tinesia creates.
const shieldAnimations = [
  "shield-break",
  "shield-block",
  "shield-fade",
  "shield",
];

function splitAnimations(
  animations: string[],
  side: string
): [string, string, string[], string[]] {
  //MONSTER IMAGE/GIF
  const monsterOptions = ["ability", "archetype"];
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
    // "shield",
    // "shield-break",
    // "shield-fade",
    // "shield-block",
    "shadow-leap",
    "slime-support",
  ];
  const aImage = animations.filter((a) => animationOptions.includes(a));
  let animationImage: string;

  if (aImage.length === 1) {
    animationImage = "animate-" + aImage[0];
  } else if (aImage.length > 1) {
    console.error(
      `ANIMATION ERROR: expected only one monster animation: ${aImage}`
    );
    animationImage = "animate-" + aImage[0];
  } else {
    animationImage = "";
  }

  if (animationImage == "animate-attack") {
    animationImage = "animate-attack-" + side;
    console.error(animationImage);
  }

  //UNDERLAYS
  //todo: include underlays
  const underlayOptions = ["lake_curse"];
  const underlayImage: string[] = animations.filter((a) =>
    underlayOptions.includes(a)
  );

  const shieldAnimation = ["shield-block", "shield-fade"];

  //OVERLAYS
  const overlayImage: string[] = animations.filter(
    (a) =>
      !monsterOptions.includes(a) &&
      !underlayOptions.includes(a) &&
      !animationOptions.includes(a) &&
      !shieldAnimation.includes(a) //TO UPDATE DEPENDING ON WHAT SHIELD IMAGES WILL EXIST
  );
  return [monsterImage, animationImage, overlayImage, underlayImage];
}

function getShieldAnimation(animations: string[]): string {
  for (const a of shieldAnimations) {
    if (animations.includes(a)) {
      return "animate-" + a;
    }
  }
  return "";
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
    splitAnimations(animations, side);
  const monsterPath = getMonsterImage(monster, monsterImage, biome);
  const shieldAnimation = getShieldAnimation(animations);
  const flip = side === "left" ? "transform -scale-x-100" : "";

  return (
    <div>
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
          <div className={`${shieldAnimation}`}>
            <img
              src={monsterPath}
              alt={monster}
              className={`z-10 ${flip} ${animationImage}`}
            ></img>
          </div>
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
                    `}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
