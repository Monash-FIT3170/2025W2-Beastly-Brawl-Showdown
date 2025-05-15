import React from "react";
import { Bar } from "./Bar";

interface HealthBarProps {
    currentHealth: number;
    maxHealth: number;
}

export const HealthBar = ({currentHealth, maxHealth}: HealthBarProps) => {
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
        <Bar colour={colour} text={String(currentHealth)} fillPercentage={healthPercentage} />
    );
}
