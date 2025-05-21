import React from "react";
import { GenericBar } from "./GenericBar";

interface LoadingBarProps {
    currentPercentage: number;
}

export const LoadingBar = ({currentPercentage}: LoadingBarProps) => {
    return (
        <GenericBar colour="terracotta" cornerRadius="heavy" textPosition="none" fillPercentage={currentPercentage as BarFillPercentage} />
    );
};
