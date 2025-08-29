import React, { useState } from "react";
import { OutlineText } from "../texts/OutlineText";

// Add `isDisabled` prop type
interface SliderProps {
  isDisabled?: boolean;
}

export const Slider: React.FC<SliderProps> = ({ isDisabled = false }) => {
  const [value, setValue] = useState<number>(5);

  return (
    <div
      className={`flex flex-col items-center space-y-4 w-full max-w-md mx-auto mt-10 
      ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        disabled={isDisabled}
        className={`w-full h-2 bg-gray-200 rounded-lg appearance-none border-[2px] border-blackCurrant 
          ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      />
      <span className="text-lg font-medium">
        <OutlineText size="large">{value}</OutlineText>
      </span>
    </div>
  );
};
