import React from "react";
import { GenericBar } from "./GenericBar";
import { OutlineText } from "../texts/OutlineText";

interface ArmourClassBarProps {
    armourClass: number;
    highestArmourClass: number;
}

export const ArmourClassBar = ({armourClass, highestArmourClass}: ArmourClassBarProps) => {
    return (
        <GenericBar colour="blue" cornerRadius="light" textPosition="right" fillPercentage={Math.floor(armourClass / highestArmourClass * 100) as BarFillPercentage}>
            <OutlineText size="tiny">
                {`${armourClass}`}
            </OutlineText>
        </GenericBar>
    );
};
