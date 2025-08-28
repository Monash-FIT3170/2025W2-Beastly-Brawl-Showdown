import React, { useState } from "react";
import { OutlineText } from "../texts/OutlineText";

export const Slider: React.FC = () => {
  const [value, setValue] = useState<number>(5);

  return (
    <div className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto mt-10">
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer border-[2px] border-blackCurrant"
      />
      <span className="text-lg font-medium">
        <OutlineText size="large">
            {value}
        </OutlineText>
      </span>
    </div>
  );
};