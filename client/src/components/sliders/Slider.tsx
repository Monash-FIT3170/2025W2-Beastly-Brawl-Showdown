import React from "react";
import { OutlineText } from "../texts/OutlineText";

interface SliderProps {
  max?: number;
  min?: number;
  selectedValue: number;
  setSelectedValue: (index: number) => void;
  isDisabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  max = 100,
  min = 0,
  selectedValue,
  setSelectedValue,
  isDisabled = false,
}) => {
  const percentage = ((selectedValue - min) / (max - min)) * 100;

  return (
    <div
      className={`relative flex flex-col items-center space-y-4 w-full max-w-md mx-auto mt-3 ${
        isDisabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <input
        type="range"
        min={min}
        max={max}
        value={selectedValue}
        onChange={(e) => setSelectedValue(Number(e.target.value))}
        disabled={isDisabled}
        className={`w-full h-2 bg-gray-300 rounded-lg border-2 border-blackCurrant ${
          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      />

      <div
        className="absolute w-10 h-10 bg-pictonBlue border-2 border-black rounded-full flex items-center justify-center pointer-events-none"
        style={{
          left: `calc(${percentage}% - 1.25rem)`,
          top: 'calc(50% - 1.7rem)'
        }}
      >
        <OutlineText size="small">{selectedValue}</OutlineText>
      </div>
    </div>
  );
};
