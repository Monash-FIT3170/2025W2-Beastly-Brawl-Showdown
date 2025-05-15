import React from "react";
import { DefendButtonTemp } from "../buttons/DefendButtonTemp";

const FlexBoxEmpty: React.FC = () => {
  return (
    <div className="flex flex-col justify-around items-center bg-forestgreen w-1/3 h-72 m-1 rounded-2xl">
        <div className="flex justify-evenly w-full px-4">
        <DefendButtonTemp label = 'DEFEND' initialCount = {3} />
        <DefendButtonTemp label = 'DEFEND' initialCount = {2} />
        </div>
        <div className="flex justify-evenly w-full px-4">
        <DefendButtonTemp label = 'DEFEND' initialCount = {1} />
        <DefendButtonTemp label = 'DEFEND' initialCount = {0} />
        </div>
    </div>
  );
};

export default FlexBoxEmpty;