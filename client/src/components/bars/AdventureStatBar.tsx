import React from "react";
import { OutlineTextResizable } from "../texts/ResizableOutlineText";

interface AdventureStatBarProps {
  stat: string;
  statVal: number;
}

export const AdventureStatBar = ({ stat, statVal }: AdventureStatBarProps) => {

    const statColour: Record<string, string> = {
        "Attack Damage":"bg-[#ED5A55]",
        "Critical Hit Rate": "bg-[#E28454]",
        "Dice Roll Range": "bg-[#BD55ED]"
    }

    const statDisplay: Record<string, string> = {
        "Attack Damage":" HP",
        "Critical Hit Rate": "%",
        "Dice Roll Range": "-20"
    }




    return (
        <div className="w-full flex flex-row justify-center">
            <div className={`sm:w-[60%] lg:w-[45%] border-3 border-blackCurrant bg-alto rounded-l-xl`}>
                <OutlineTextResizable size="small">
                    {stat}
                </OutlineTextResizable>
            </div>
            <div className={`sm:w-[16%] lg:w-[12%] ${statColour[stat]} border-3 border-blackCurrant rounded-r-xl`}>
                <OutlineTextResizable size="small">
                    {`${statVal}${statDisplay[stat]}`}
                </OutlineTextResizable>
            </div>
            
        </div>
    );

  );
};
