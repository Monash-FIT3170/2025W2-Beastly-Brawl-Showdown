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

        const baseBackBarProperties = `
      
        w-[60%]
        border-3
        border-blackCurrant
        bg-alto
        rounded-xl
    `;

    let baseFrontBarProperties = `
        bg-goldenRod
        border-3
        flex
        items-center
        justify-center
        transition-[width]
        duration-300
        ease-in-out
        rounded-xl
    `;


    return (
        <div className="w-full flex flex-row justify-center">
            <div className={`w-[30%] border-3 border-blackCurrant bg-alto rounded-l-xl`}>
                <OutlineTextResizable size="small">
                    {stat}
                </OutlineTextResizable>
            </div>
            <div className={`w-[8%] ${statColour[stat]} border-3 border-blackCurrant rounded-r-xl`}>
                <OutlineTextResizable size="small">
                    {`${statVal}`}
                </OutlineTextResizable>
            </div>
            
        </div>
    );

  );
};
