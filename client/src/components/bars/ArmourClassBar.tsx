import React from "react";
import { Bar } from "./Bar";

interface ArmourClassProps {
    armourClass: number;
    highestArmourClass: number;
}

export const ArmourClassBar = ({armourClass, highestArmourClass}: ArmourClassProps) => {
    return (
        <Bar colour="customblue" text={String(armourClass)} fillPercentage={Math.floor(armourClass / highestArmourClass * 100)} />
    );
}
