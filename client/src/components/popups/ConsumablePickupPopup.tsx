// ConsumablePickupPopup.tsx
import React from "react";
import { ConsumablePopup } from "./ConsumablePopup";
import { ConsumableState } from "/types/single/itemState";

interface ConsumablePickupPopupProps {
  consumable: ConsumableState;
  onTake: () => void; // put into backpack
  onDrop: () => void; // discard
}

export const ConsumablePickupPopup = ({
  consumable,
  onTake,
  onDrop,
}: ConsumablePickupPopupProps) => {
  // We reuse ConsumablePopup but override the button text/behaviour
  return (
    <ConsumablePopup
      consumable={consumable}
      isDisabled={false}
      onClose={onDrop} // “BACK / DROP”
      onConsume={onTake} // “CONSUME” button becomes “TAKE”
      backText="DROP"
      consumeText="TAKE"
      confirmText="You found a consumable! What do you want to do?"
    />
  );
};
