import React from "react";
import { GenericBar } from "./GenericBar";
import { OutlineTextBP } from "../texts/OutlineTextBP";

interface BattleHealthBarProps {
    currentHealth: number;
    maxHealth: number;
}

export const BattleHealthBar = ({currentHealth, maxHealth}: BattleHealthBarProps) => {
    let healthPercentage = Math.floor(currentHealth / maxHealth * 100);

    let colour: BarColour = "green";
    if (healthPercentage <= 20) {
        colour = "red";
    } else if (healthPercentage <= 50) {
        colour = "yellow";
    }

    return (
        <GenericBar colour={colour} cornerRadius="heavy" textPosition="left" fillPercentage={healthPercentage as BarFillPercentage}>
            <OutlineTextBP size="medium">
                {`${currentHealth}/${maxHealth}`}
            </OutlineTextBP>
        </GenericBar>
    );
};