import React from "react";
import { GenericBar } from "./GenericBar";
import { OutlineText } from "../texts/OutlineText";

interface TotalHealthBarProps {
    totalHealth: number;
    highestTotalHealth: number;
}

export const TotalHealthBar = ({totalHealth, highestTotalHealth}: TotalHealthBarProps) => {
    return (
        <GenericBar colour="green" cornerRadius="light" textPosition="right" fillPercentage={Math.floor(totalHealth / highestTotalHealth * 100) as BarFillPercentage}>
            <OutlineText size="tiny">
                {`${totalHealth}`}
            </OutlineText>
        </GenericBar>
    );
};
