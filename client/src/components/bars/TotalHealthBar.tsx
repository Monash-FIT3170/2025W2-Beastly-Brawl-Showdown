import React from "react";
import { Bar } from "./Bar";

interface TotalHealthBarProps {
    totalHealth: number;
    highestTotalHealth: number;
}

export const TotalHealthBar = ({totalHealth, highestTotalHealth}: TotalHealthBarProps) => {
    return (
        <Bar colour="neongreen" text={String(totalHealth)} textPosition="right" radius="lg" fillPercentage={Math.floor(totalHealth / highestTotalHealth * 100)} />
    );
}
