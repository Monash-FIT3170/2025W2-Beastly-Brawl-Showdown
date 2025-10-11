import { BlankPage } from "../../components/pagelayouts/BlankPage";
import React from "react";

export const Test = () => {
  return (
    <BlankPage>
      <p>Animation Testing Page</p>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <p>Damage Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/ROCKY_RHINO_DAMAGE.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Attack Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>Defend Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield`}
          ></img>
        </div>
        <div>
          <p>Damage Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-damage`}
          ></img>
        </div>
        <div>
          <p>Attack Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-attack`}
          ></img>
        </div>
        <div>
          <p>Defend Action Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-defend`}
          ></img>
        </div>
        <div>
          <p>Shadow Leap</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shadow-leap`}
          ></img>
        </div>
        <div>
          <p>Defend Fade Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield-fade`}
          ></img>
        </div>
      </div>
    </BlankPage>
  );
};
