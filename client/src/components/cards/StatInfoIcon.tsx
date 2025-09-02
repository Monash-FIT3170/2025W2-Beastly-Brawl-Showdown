import React from "react";
import { OutlineTextResizable } from "../texts/ResizableOutlineText";
import { serialize } from "v8";
import { PlayerState } from "/types/single/playerState";

interface StatInfoIconProps {
  stat: string;
  statVal: number;
}

export const StatInfoIcon = ({ stat, statVal }: StatInfoIconProps) => {
  const imgpath: Record<string, string> = {
    AC: "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/ARMOUR_CLASS.png",
    HP: "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/HEALTH.png",
    "ATK+":
      "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/ATTACK_BONUS.png",
  };
  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="border-[3px] border-[#403245] bg-goldenRod rounded-full sm:size-[8rem] lg:size-[5rem] flex justify-center items-center">
        <img className="size-[70%]" src={imgpath[stat]}></img>
      </div>
      <OutlineTextResizable size="small">{`${statVal} ${stat}`}</OutlineTextResizable>
    </div>
  );
};
