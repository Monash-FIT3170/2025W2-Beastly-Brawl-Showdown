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
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
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
            className={`relative inline-block xl:w-[90%] z-10 animate-attack`}
          ></img>
        </div>
        <div>
          <p>Defend Animation</p>
          <img
            src={
              "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/character/ROCKY_RHINO.png"
            }
            className={`relative inline-block xl:w-[90%] z-10 animate-defend`}
          ></img>
        </div>
      </div>
    </BlankPage>
  );
};
