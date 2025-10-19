import React, { useState } from "react";
import { IconButton } from "../buttons/IconButton";
import { GameModeCardData } from "../../types/SelectorCardData";
import { GameModeIdentifier } from "../../../../types/single/gameMode";
import { GameModeCardPlain } from "../cards/GameModeCardPlain";
import { GameModeCardSlider } from "../cards/GameModeCardSlider";

interface GameModeSelectorProps {
  cardData: GameModeCardData[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  selectedSliderValue: number;
  setSelectedSliderValue: (index: number) => void;
}

const GameModeSelector: React.FC<GameModeSelectorProps> = ({
  cardData,
  selectedIndex,
  setSelectedIndex,
  selectedSliderValue,
  setSelectedSliderValue
}) => {
  const prev = () =>
    setSelectedIndex(
      selectedIndex === 0 ? cardData.length - 1 : selectedIndex - 1
    );

  const next = () =>
    setSelectedIndex(
      selectedIndex === cardData.length - 1 ? 0 : selectedIndex + 1
    );

  // Define which cards each mode should use
  const plainCardModes = [
    GameModeIdentifier.BATTLE_ROYALE
  ];
  const sliderCardModes = [
    GameModeIdentifier.SCORING
  ];

  return (
    <div className="flex items-center justify-center h-full w-full space-x-4">
      {/* Left Arrow */}
      <IconButton style="arrowleft" buttonColour="blue" iconColour="stroked" size="small" onClick={prev} />

      {/* Cards */}
      {plainCardModes.includes(cardData[selectedIndex].mode) ? (
        <GameModeCardPlain cardData={cardData[selectedIndex]} />
      ) : sliderCardModes.includes(cardData[selectedIndex].mode) ? (
        <GameModeCardSlider
          cardData={cardData[selectedIndex]}
          sliderText={cardData[selectedIndex].sliderText ?? ""}
          sliderMin={cardData[selectedIndex].sliderMin ?? 1}
          sliderMax={cardData[selectedIndex].sliderMax ?? selectedSliderValue}
          selectedSliderValue={selectedSliderValue}
          setSelectedSliderValue={setSelectedSliderValue}
        />
      ) :
        null
      }

      {/* Right Arrow */}
      <IconButton style="arrowright" buttonColour="blue" iconColour="stroked" size="small" onClick={next} />
    </div>
  );
};

export default GameModeSelector;
