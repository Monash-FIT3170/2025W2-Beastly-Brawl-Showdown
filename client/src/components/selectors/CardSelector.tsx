import React, { useState } from "react";
import { IconButton } from "../buttons/IconButton";
import { OutlineText } from "../texts/OutlineText";
import { BlackText } from "../texts/BlackText";

interface CardSelectorProps {
  options: SelectorOption[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const CardSelector: React.FC<CardSelectorProps> = ({
  options,
  selectedIndex,
  setSelectedIndex,
}) => {
  const prev = () =>
    setSelectedIndex(
      selectedIndex === 0 ? options.length - 1 : selectedIndex - 1
    );

  const next = () =>
    setSelectedIndex(
      selectedIndex === options.length - 1 ? 0 : selectedIndex + 1
    );

  return (
    <div className="flex items-center justify-center h-full w-full space-x-4">
      {/* Left Arrow */}
      <IconButton style="arrowleft" buttonColour="blue" iconColour="stroked" size="small" onClick={prev} />
      
      {/* Card */}
      <div className="outline-[0.25rem] bg-pictonBlue p-6 rounded-xl w-120 text-center">
        <OutlineText size="large">{options[selectedIndex].title}</OutlineText>
        <BlackText size="medium">{options[selectedIndex].description}</BlackText>
      </div>

      {/* Right Arrow */}
      <IconButton style="arrowright" buttonColour="blue" iconColour="stroked" size="small" onClick={next} />
    </div>
  );
};

export default CardSelector;
