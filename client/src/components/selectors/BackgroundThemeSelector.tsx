import React, { useState } from "react";
import { IconButton } from "../buttons/IconButton";
import { OutlineText } from "../texts/OutlineText";
import { BackgroundThemeCardData } from "../../types/SelectorCardData";

interface BackgroundThemeSelectorProps {
  cardData: BackgroundThemeCardData[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const BackgroundThemeSelector: React.FC<BackgroundThemeSelectorProps> = ({
  cardData,
  selectedIndex,
  setSelectedIndex,
}) => {
  const prev = () =>
    setSelectedIndex(
      selectedIndex === 0 ? cardData.length - 1 : selectedIndex - 1
    );

  const next = () =>
    setSelectedIndex(
      selectedIndex === cardData.length - 1 ? 0 : selectedIndex + 1
    );

  return (
    <div className="flex items-center justify-center h-full w-full space-x-4">
      {/* Left Arrow */}
      <IconButton
        style="arrowleft"
        buttonColour="blue"
        iconColour="black"
        size="small"
        onClick={prev}
      />
      
      {/* Cards */}
      <div className="outline-[0.25rem] bg-peach p-2 rounded-xl w-120 text-center">
        <OutlineText size="large">{cardData[selectedIndex].name}</OutlineText>
      </div>

      {/* Right Arrow */}
      <IconButton
        style="arrowright"
        buttonColour="blue"
        iconColour="black"
        size="small"
        onClick={next}
      />
    </div>
  );
};

export default BackgroundThemeSelector;
