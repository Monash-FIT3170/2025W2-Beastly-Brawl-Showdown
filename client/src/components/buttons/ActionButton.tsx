import React from "react";
import { ButtonGeneric } from "./ButtonGeneric";
import { OutlineText } from "../texts/OutlineText";
import { ActionState, ActionIdentifier } from "../../../../types/single/actionState";
import socket from "../../socket";
import { ButtonGenericProps } from "./ButtonGeneric";

interface ActionButtonProps {
    actionState: ActionState;
    battleId: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ actionState, battleId }) => {
    const imagePath = "/assets/actions/" + actionState.id + ".png";
    const name = actionState.name;
    const availableUses = actionState.currentUse; // How many REMAINING uses

    const colorLoader: Record<string, ButtonGenericProps["color"]> = {
        [ActionIdentifier.ATTACK]: 'red',
        [ActionIdentifier.DEFEND]: 'blue',
        [ActionIdentifier.NULL]: 'ronchi',
    };

    // Check if we still have available uses
    const isDisabled = availableUses == 0;

    const handleClick = () => {
        if (isDisabled) return;
        // Do the action stuff
        socket.emit("action_selected", { action: actionState, battleId, playerId: socket.id });
    };
    
    const image =
        `
        w-[30%]
        h-[auto%]
        object-contain
        ml-auto
        `;

    return(
        <div>
            <ButtonGeneric color={colorLoader[actionState.id]} size='battle' isDisabled={isDisabled} onClick={handleClick}>
                <div className="w-[50%] h-auto leading-[0.8]">
                    <OutlineText size = 'medium'>
                        {name}
                    </OutlineText>
                </div>
                <img className = {`${image}`} src={`${imagePath}`} alt={`${actionState.id} image`}/>
            </ButtonGeneric>

            {availableUses != Infinity && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#FFE07C] border-4 border-[#403245] rounded-full w-10 h-10 flex items-center justify-center text-[#403245] font-jua text-lg">
                    {availableUses}
                </div>
            )}
        </div>
    );
};

export default ActionButton;