import React from "react";
import { GenericBar } from "./GenericBar";
import { OutlineText } from "../texts/OutlineText";

interface BattleHealthBarProps {
    currentHealth: number;
    maxHealth: number;
}

export const BattleHealthBar = ({currentHealth, maxHealth}: BattleHealthBarProps) => {
    let colour: BarColour;
    let healthPercentage = Math.floor(currentHealth / maxHealth * 100);
    if (healthPercentage > 70) {
        colour = "green";
    } else if (healthPercentage > 30) {
        colour = "yellow";
    } else {
        colour = "red";
    }

    return (
        <GenericBar colour={colour} cornerRadius="heavy" textPosition="left" fillPercentage={healthPercentage as BarFillPercentage}>
            <OutlineText size="medium">
                {`${currentHealth}/${maxHealth}`}
            </OutlineText>
        </GenericBar>
    );
};
