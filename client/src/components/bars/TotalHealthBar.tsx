import React from "react";
import { Bar } from "./Bar";
import { OutlineText } from "../texts/OutlineText";

interface TotalHealthBarProps {
    totalHealth: number;
    highestTotalHealth: number;
}

export const TotalHealthBar = ({totalHealth, highestTotalHealth}: TotalHealthBarProps) => {
    return (
        <Bar colour="green" cornerRadius="light" textPosition="right" fillPercentage={Math.floor(totalHealth / highestTotalHealth * 100) as BarFillPercentage}>
            <OutlineText text={`${totalHealth}`} size="medium" />
        </Bar>
    );
};
