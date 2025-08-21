import React, { ReactNode, useState } from 'react';
import { PopupClean } from './PopupClean';
import { ChoicePopup } from './ChoicePopup';
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { OutlineText } from '../texts/OutlineText';
import { ButtonGeneric } from '../buttons/ButtonGeneric';
import { DialogueChoiceButton } from '../buttons/DialogueChoiceButton';

export interface LeavePopupProp{
    open: boolean;
    onClose: () => void;
}

export const LeavePopup = ({open, onClose}: LeavePopupProp)=>{
    if (!open) return null;

    const leave = () => {
        socket.emit('leave-game', {userID:socket.id})
        FlowRouter.go("/adventure/level-select")
    };

    // const [visible, setVisible] = useState(true);
    //     if (!visible) return null;

    return(
        <PopupClean>
            <div className = "items-center flex-col inline-block inline-flex outline-offset-0 relative">
                <OutlineText size="choice-text">Leave and let your monster adventure alone?</OutlineText>
                <div className="flex mt-4 space-x-[3rem]">
                    <ButtonGeneric color="red" size="adventure" onClick={leave}><OutlineText size="choice-text">Exit</OutlineText></ButtonGeneric>
                    {/* <ButtonGeneric color="blue" size="adventure" onClick={() => setVisible(false)}><OutlineText size="choice-text">Back</OutlineText></ButtonGeneric> */}
                    <ButtonGeneric color="blue" size="adventure" onClick={onClose}><OutlineText size="choice-text">Back</OutlineText></ButtonGeneric>
                    {/* <DialogueChoiceButton onClick={leave}><OutlineText size="medium">Exit</OutlineText></DialogueChoiceButton>
                    <DialogueChoiceButton onClick={() => setVisible(false)}><OutlineText size="medium">Back</OutlineText></DialogueChoiceButton> */}
                </div>
            </div>
        </PopupClean>
    )

}