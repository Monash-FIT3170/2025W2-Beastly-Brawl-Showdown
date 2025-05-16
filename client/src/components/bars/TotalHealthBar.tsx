import React from "react";
import { Bar } from "./Bar";

interface TotalHealthBarProps {
    totalHealth: number;
    highestHealth: number;
}

export const TotalHealthBar = ({totalHealth, highestHealth}: TotalHealthBarProps) => {
    return (
        <Bar colour="neongreen" text={String(totalHealth)} textPosition="right" radius="lg" fillPercentage={Math.floor(totalHealth / highestHealth * 100)} />
    );
}
