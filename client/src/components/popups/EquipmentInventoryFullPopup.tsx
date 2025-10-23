import React, { useState } from "react";
import { EquipmentState } from "/types/single/itemState";
import { PopupClean } from "./PopupClean";
import { OutlineText } from "../texts/OutlineText";
import { EquipmentCard } from "../cards/EquipmentCard";
import { EquipmentPopup } from "./EquipmentPopup";
import { IconButton } from "../buttons/IconButton";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { BlackText } from "../texts/BlackText";

export interface EquipmentInventoryFullPopupProps {
  currentEquipment: EquipmentState[];
  incomingEquipment: EquipmentState;
  onReplaceEquipment: (removeIndex: number) => void;
  onRejectIncoming: () => void;
}

export const EquipmentInventoryFullPopup = ({
  currentEquipment,
  incomingEquipment,
  onReplaceEquipment,
  onRejectIncoming,
}: EquipmentInventoryFullPopupProps) => {
  // Equipment popup state
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentState | null>(null);
  const [showEquipmentPopup, setShowEquipmentPopup] = useState(false);

  // Confirmation popup state
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleEquipmentClick = (equipment: EquipmentState) => {
    setSelectedEquipment(equipment);
    setShowEquipmentPopup(true);
  };

  const closeEquipmentPopup = () => {
    setShowEquipmentPopup(false);
    setSelectedEquipment(null);
  };

  const showConfirmationDialog = (action: () => void, message: string) => {
    setPendingAction(() => action);
    setConfirmationMessage(message);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction();
    }
    setShowConfirmation(false);
    setPendingAction(null);
    setConfirmationMessage("");
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPendingAction(null);
    setConfirmationMessage("");
  };

  return (
    <>
      <PopupClean>
        <div className="flex flex-col items-center gap-4">
          <OutlineText size="large">YOUR BAG IS TOO HEAVY!</OutlineText>

          {/* Bordered container */}
          <div className="bg-ronchi border-4 border-blackCurrant rounded-2xl p-6 w-full">
            <div className="flex flex-col items-center gap-2">
              <OutlineText size="medium">REMOVE AN ITEM!</OutlineText>

              <div className="grid grid-flow-row h-full w-full auto-rows-auto gap-2">
                {/* Current equipment slots */}
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center">
                    <div className="flex-1">
                      {currentEquipment[i] ? (
                        <EquipmentCard
                          equipment={currentEquipment[i]}
                          onClick={() =>
                            handleEquipmentClick(currentEquipment[i])
                          }
                        />
                      ) : (
                        <span className="text-gray-400">Empty Slot</span>
                      )}
                    </div>
                    {currentEquipment[i] && (
                      <IconButton
                        style="bin"
                        iconColour="black"
                        buttonColour="red"
                        size="large"
                        onClick={() =>
                          showConfirmationDialog(
                            () => onReplaceEquipment(i),
                            `Remove ${currentEquipment[i].name}?`
                          )
                        }
                      />
                    )}
                  </div>
                ))}

                {/* Incoming equipment */}
                <div className="flex items-center">
                  <div className="flex-1">
                    <EquipmentCard
                      equipment={incomingEquipment}
                      onClick={() => handleEquipmentClick(incomingEquipment)}
                    />
                  </div>
                  <IconButton
                    style="bin"
                    iconColour="black"
                    buttonColour="red"
                    size="large"
                    onClick={() =>
                      showConfirmationDialog(
                        () => onRejectIncoming(),
                        `Discard ${incomingEquipment.name}?`
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopupClean>

      {/* Equipment Details Popup */}
      {showEquipmentPopup && selectedEquipment && (
        <EquipmentPopup
          equipment={selectedEquipment}
          onClose={closeEquipmentPopup}
          backText="BACK"
        />
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <PopupClean>
          <div className="flex flex-col items-center gap-4 p-4">
            <OutlineText size="large">{confirmationMessage}</OutlineText>

            <div className="flex gap-8 mt-4">
              <ButtonGeneric color="red" size="battle" onClick={handleCancel}>
                <OutlineText size="choice-text">BACK</OutlineText>
              </ButtonGeneric>

              <ButtonGeneric color="blue" size="battle" onClick={handleConfirm}>
                <OutlineText size="choice-text">REMOVE</OutlineText>
              </ButtonGeneric>
            </div>
          </div>
        </PopupClean>
      )}
    </>
  );
};
