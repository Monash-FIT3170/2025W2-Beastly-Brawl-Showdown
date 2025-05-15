import React from "react";
import { Bar } from "./Bar";

interface BattleHealthBarProps {
    currentHealth: number;
    maxHealth: number;
}

export const BattleHealthBar = ({currentHealth, maxHealth}: BattleHealthBarProps) => {
    let colour;
    let healthPercentage = Math.floor(currentHealth / maxHealth * 100);
    if (healthPercentage > 70) {
        colour = "neongreen";
    } else if (healthPercentage > 30) {
        colour = "plainyellow";
    } else {
        colour = "sharpred";
    }
    return (
        <Bar colour={colour} text={String(currentHealth) + "/" + String(maxHealth)} textPosition="left" radius="2xl" fillPercentage={healthPercentage} />
    );
}
