import React from "react";
import { GameModeCardData } from "../../types/SelectorCardData";
import { BlackText } from "../texts/BlackText";
import { OutlineText } from "../texts/OutlineText";

interface GameModeCardPlainProps {
  cardData: GameModeCardData;
}

export const GameModeCardPlain = ({ cardData }: GameModeCardPlainProps) => {
  return (
    <div className="outline-[0.25rem] bg-pictonBlue p-6 rounded-xl w-120 text-center">
      <OutlineText size="large">{cardData.title}</OutlineText>
      <BlackText size="medium">{cardData.description}</BlackText>
    </div>
  );
};
