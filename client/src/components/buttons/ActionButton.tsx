import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";
import {
  ActionState,
  ActionIdentifier,
} from "../../../../types/single/actionState";
import socket from "../../socket";
import { ButtonGenericProps } from "./ButtonGeneric";
import { OutlineTextResizable } from "../texts/ResizableOutlineText";

interface ActionButtonProps {
  actionState: ActionState;
  battleId: string;
  isActive: boolean;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  actionState,
  battleId,
  isActive,
  onClick,
}) => {
  const imagePath =
    "https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/action/" +
    actionState.id +
    ".webp";
  const name = actionState.name.toUpperCase();
  const availableUses = actionState.currentUse; // How many REMAINING uses
  const isPassive = actionState.maxUse == 0; // Action is a passive ability if it can't be used

  const colorLoader: Record<string, ButtonGenericProps["color"]> = {
    [ActionIdentifier.ATTACK]: "red",
    [ActionIdentifier.DEFEND]: "blue",
    [ActionIdentifier.NULL]: "ronchi",
  };

  // Check if we still have available uses
  const isDisabled = availableUses == 0;

  const actionClicked = () => {
    if (isDisabled) return;
    // Do the action stuff
    socket.emit("action_selected", {
      action: actionState,
      battleId,
      playerId: socket.id,
    });
    onClick();
  };

  const adventureClicked = () => {
    socket.emit("adventure_action", {
      action: actionState,
      playerId: socket.id,
    });
    onClick();
  };

  const image = `
        w-[30%]
        h-[auto%]
        object-contain
        ml-auto
        `;

  return (
    <div className="relative group">
      <ButtonGeneric
        color={colorLoader[actionState.id] ?? "purple"}
        size="battle"
        isDisabled={isDisabled}
        onClick={battleId === "ADVENTURE" ? adventureClicked : actionClicked}
        isPassive={isPassive}
      >
        <div className="w-[50%] h-auto leading-[0.8]">
          {name === "ATTACK" || name === "DEFEND" ? (
            <OutlineText size="medium">{name}</OutlineText>
          ) : (
            <OutlineTextResizable max1={5} max2={7} max3={10} size="medium">
              {name}
            </OutlineTextResizable>
          )}
        </div>
        <img
          className={`${image} rounded-md`}
          src={`${imagePath}`}
          alt={`${actionState.id} image`}
        />
      </ButtonGeneric>

      {availableUses != null && !isPassive && (
        <div
          className={`
                absolute
                top-14
                right-18
                w-10
                h-10
                rounded-full
                bg-[#FFE07C]
                border-3
                border-[#403245]
                text-white
                flex
                items-center
                justify-center
                text-sm
                font-jua
                overflow-hidden
                ${!isDisabled ? "group-hover:brightness-85" : ""}
                ${
                  isDisabled
                    ? "\
                    grayscale\
                    cursor-not-allowed\
                "
                    : ""
                }
            `}
        >
          <OutlineText size="medium">{availableUses}</OutlineText>

          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-black/30 rounded-b pointer-events-none h-[50%]" />
          )}
        </div>
      )}

      {isActive && (
        <div className="absolute inset-0 z-10 bg-black/30 rounded pointer-events-none" />
      )}
    </div>
  );
};

export default ActionButton;
