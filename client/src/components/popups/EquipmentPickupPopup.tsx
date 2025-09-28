import React from "react";
import { EquipmentState } from "/types/single/itemState";
import { EquipmentPopup } from "./EquipmentPopup";

interface EquipmentPickupPopupProps {
  equipment: EquipmentState;
  onEquip: () => void;
  onDrop: () => void;
}

export const EquipmentPickupPopup: React.FC<EquipmentPickupPopupProps> = ({
  equipment,
  onEquip,
  onDrop,
}) => {
  return (
    <EquipmentPopup
      equipment={equipment}
      onClose={onDrop}
      onEquip={onEquip}
      backText="DROP"
      equipText="EQUIP"
    />
  );
};
