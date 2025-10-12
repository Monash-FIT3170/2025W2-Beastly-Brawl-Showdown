import React from "react";
import { MonsterIdentifier } from "/types/single/monsterState";

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
  "shield_break",
  "shield",
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

function getAbilityOverlay(monster: MonsterIdentifier, biome?: string): string {
  let monsterName = monster;
  if (monster === MonsterIdentifier.SLIME && biome) monsterName = `SLIME_${biome}`;
  return (
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
    monsterName +
    "_ABILITY.gif"
  );
}

//change gif size to fit monster image
const ABILITY_TUNING: Partial<Record<MonsterIdentifier, { scale: number; x: number; y: number }>> = {
  //increase y to push down, increase x to move left
  [MonsterIdentifier.CHARMER_COBRA]: { scale: 1.2, x: 0, y: 0 },
  [MonsterIdentifier.FURIOUS_FLIPPER]: { scale: 1.65, x: -60, y: 60 },
  [MonsterIdentifier.POISON_POGO]: { scale: 1.05, x: 0, y: 0 },

};



const DEFAULT_TUNING = { scale: 1, x: 0, y: 0 };

const shieldAnimations = [
  "shield-broken",
  "shield-crack",
  "defend",
  "shield-expire",
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
    "damage",
    "shadow-leap",
    "slime-support",
    "fortress-stance",
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
  }

  //UNDERLAYS
  //todo: include underlays
  const underlayOptions = ["lake_curse"];
  const underlayImage: string[] = animations.filter((a) =>
    underlayOptions.includes(a)
  );

  //OVERLAYS
  const overlayImage: string[] = animations.filter(
    (a) =>
      !monsterOptions.includes(a) &&
      !underlayOptions.includes(a) &&
      !animationOptions.includes(a) &&
      !shieldAnimations.includes(a)
  );
  console.error([monsterImage, animationImage, overlayImage, underlayImage]);
  return [monsterImage, animationImage, overlayImage, underlayImage];
}

function getShieldAnimation(animations: string[]): [string, string] {
  let animation = "invisible";
  let image = "";

  //TODO: handle shield expiring

  for (const a of shieldAnimations) {
    if (animations.includes(a)) {
      animation = "animate-" + a;
      image =
        "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/" +
        a.toUpperCase().replace("-", "_") +
        ".png";
      return [animation, image];
    }
  }
  return [animation, image];
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
  const monsterPath = getMonsterImage(monster, "default", biome);
  const hasAbility = animations.includes("ability");
  const abilitySrc = hasAbility ? getAbilityOverlay(monster, biome) : "";
  const tune = ABILITY_TUNING[monster] ?? DEFAULT_TUNING;

  const [shieldAnimation, shieldImage] = getShieldAnimation(animations);
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
    <div className={`justify-self-center ${animationImage} w-full flex justify-center`}>
      <div className="relative mx-auto w-full xl:w-1/2 max-w-[28rem] aspect-square overflow-visible">
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
          <img
            src={monsterPath}
            alt={monster}
            style={{transform: `scale(1)` }}
            className={`absolute inset-0 w-full h-full object-contain object-bottom  z-10 ${flip}  ${hasAbility ? "opacity-0" : "opacity-100"}`}
          />

          {/* Ability gif overlay*/}
          {hasAbility && (
            <img
              src={abilitySrc}
              alt=""
              aria-hidden="true"
              style={{
                zIndex: 20,
                transform: `${side === "left" ? "scaleX(-1) " : ""} scale(${tune.scale}) translateY(${tune.y}px) translateX(${tune.x}px)`,
                transformOrigin: "center bottom",
              }}
              className={`absolute  inset-0 bottom-0 h-full w-auto object-contain pointer-events-none select-none`}
            />
          )}
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
          <img
            src={shieldImage}
            style={{ zIndex: 1000 }}
            className={`absolute inset-0 pointer-events-none select-none ${shieldAnimation}`}
          ></img>
        </div>
      </div>
  );
};

//     <div className={`justify-self-center w-full flex justify-center ${animationImage}`}>
//       <div className="relative inline-block xl:w-[50%]">
//         {/* Monster "Animations" */}
//         <div className="relative inset-0 flex items-center justify-center">
//           {underlayImage.map((item, i) => {
//             const overlay = getOverlay(item);
//             const z = 5;
//             return (
//               <img
//                 src={overlay}
//                 style={{ zIndex: z }}
//                 className={`
//                     absolute inset-0 
//                     pointer-events-none 
//                     select-none 
//                     ${flip}
//                     `}
//               />
//             );
//           })}
//           <img src={monsterPath} alt={monster} className={`z-10 ${flip}`}></img>
//           {overlayImage.map((item, i) => {
//             const overlay = getOverlay(item);
//             const z = getZLevel(item, 20);
//             return (
//               <img
//                 src={overlay}
//                 style={{ zIndex: z }}
//                 className={`
//                     absolute inset-0 
//                     pointer-events-none 
//                     select-none 
//                     ${flip}
//                     `}
//               />
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };
