import React from "react";
import { Bar } from "./Bar";
import { OutlineText } from "../texts/OutlineText";

interface ArmourClassBarProps {
    armourClass: number;
    highestArmourClass: number;
}

export const ArmourClassBar = ({armourClass, highestArmourClass}: ArmourClassBarProps) => {
    return (
        <Bar colour="blue" cornerRadius="light" textPosition="right" fillPercentage={Math.floor(armourClass / highestArmourClass * 100) as BarFillPercentage}>
            <OutlineText text={`${armourClass}`} size="medium" />
        </Bar>
    );
};
