import { BlankPage } from "../../components/pagelayouts/BlankPage";
import React from "react";

export const DefendPage = () => {
  return (
    <BlankPage>
      <p>Animation Testing Page</p>
      <div className="grid grid-cols-4 gap-2 overflow-auto">
        <div>
          <p>Defend (Shield Creation)</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-defend`}
          ></img>
        </div>
        <div>
          <p>Defend (Shield Creation)</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-defend transform -scale-x-100`}
          ></img>
        </div>
        <div>
          <p>Shield Active</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield`}
          ></img>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/animation/SHIELD.png"
            }
            className={`relative inline-block xl:w-[90%] z-12`}
          ></img>
        </div>
        <div>
          <p>Shield Block!</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POISON_POGO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield-block`}
          ></img>
        </div>
        <div>
          <p>Shield Block!</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/CHARMER_COBRA.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield-block`}
          ></img>
        </div>
        <div>
          <p>Shield Break!!</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield-break`}
          ></img>
        </div>
        <div>
          <p>Shield Break!!</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield-break`}
          ></img>
        </div>
        <div>
          <p>Shield Fades</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/POUNCING_BANDIT.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-shield-expire`}
          ></img>
        </div>
      </div>
    </BlankPage>
  );
};
