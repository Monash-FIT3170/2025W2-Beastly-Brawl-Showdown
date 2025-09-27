// ConsumablePickupPopup.tsx
import React from "react";
import { StoryItemPopup } from "./StoryItemPopup";
import { StoryItemState } from "/types/single/itemState";

interface StoryItemPickupPopupProps {
  storyItem: StoryItemState;
  onTake: () => void; // put into backpack
  onDrop: () => void; // discard
}

export const StoryItemPickupPopup = ({
  storyItem,
  onTake,
  onDrop,
}: StoryItemPickupPopupProps) => {
  return (
    <StoryItemPopup
      storyItem={storyItem}
      onClose={onDrop}
      onTake={onTake}
      backText="DROP"
      takeText="TAKE"
    />
  );
};
