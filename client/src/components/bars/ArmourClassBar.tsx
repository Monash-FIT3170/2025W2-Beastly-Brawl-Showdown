import React from "react";
import { Bar } from "./Bar";

interface ArmourClassBarProps {
    armourClass: number;
    highestArmourClass: number;
}

export const ArmourClassBar = ({armourClass, highestArmourClass}: ArmourClassBarProps) => {
    return (
        <Bar colour="customblue" text={String(armourClass)} textPosition="right" radius="lg" fillPercentage={Math.floor(armourClass / highestArmourClass * 100)} />
    );
}
