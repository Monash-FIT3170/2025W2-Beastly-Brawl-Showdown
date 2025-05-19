import React from "react";
import { Bar } from "./Bar";

interface LoadingBarProps {
    currentPercentage: number;
}

export const LoadingBar = ({currentPercentage}: LoadingBarProps) => {
    return (
        <Bar colour="orange" cornerRadius="heavy" textPosition="none" fillPercentage={currentPercentage as BarFillPercentage} />
    );
};
