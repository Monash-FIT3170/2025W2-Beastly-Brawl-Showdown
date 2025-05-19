import React from "react";
import { Bar } from "./Bar";

interface LoadingBarProps {
    currentPercentage: number;
}

export const LoadingBar = ({currentPercentage}: LoadingBarProps) => {
    return (
        <Bar colour="orange" cornerRadius="heavy" textPosition="left" fillPercentage={currentPercentage as BarFillPercentage} />
    );
};
