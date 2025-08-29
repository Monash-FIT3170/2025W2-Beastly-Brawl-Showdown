import React, { useState } from "react";
import { OutlineText } from "../texts/OutlineText";

// Add `isDisabled` prop type
interface SliderProps {
  max?: number, 
  min?: number,
  selectedValue: number;
  setSelectedValue: (index: number) => void;
  isDisabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ max = 100, min = 0, selectedValue, setSelectedValue, isDisabled = false }) => {

  return (
    <div
      className={`flex flex-col items-center space-y-4 w-full max-w-md mx-auto mt-10 
      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={selectedValue}
        onChange={(e) => setSelectedValue(Number(e.target.value))}
        disabled={isDisabled}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none border-[2px] border-blackCurrant 
          ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      />
      <span className="text-lg font-medium">
        <OutlineText size="large">{selectedValue}</OutlineText>
      </span>
    </div>
  );
};
