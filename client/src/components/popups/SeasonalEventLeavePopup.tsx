import React, { ReactNode, useState } from "react";
import { PopupClean } from "./PopupClean";
import { ChoicePopup } from "./ChoicePopup";
import socket from "../../socket";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { DialogueChoiceButton } from "../buttons/DialogueChoiceButton";

export interface EventLeavePopupProp {
  open: boolean;
  onClose: () => void;
}

export const EventLeavePopup = ({ open, onClose }: EventLeavePopupProp) => {
  if (!open) return null;

  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/");
  };

  // const [visible, setVisible] = useState(true);
  //     if (!visible) return null;

  return (
    <PopupClean>
      <div className="items-center flex-col inline-block inline-flex outline-offset-0 relative">
        <OutlineText size="choice-text">
          Abandon this event and let your monster fend for themselves?
        </OutlineText>
        <div className="flex mt-4 space-x-[3rem]">
          <ButtonGeneric color="red" size="adventure" onClick={leave}>
            <OutlineText size="choice-text">EXIT</OutlineText>
          </ButtonGeneric>
          {/* <ButtonGeneric color="blue" size="adventure" onClick={() => setVisible(false)}><OutlineText size="choice-text">Back</OutlineText></ButtonGeneric> */}
          <ButtonGeneric color="blue" size="adventure" onClick={onClose}>
            <OutlineText size="choice-text">BACK</OutlineText>
          </ButtonGeneric>
          {/* <DialogueChoiceButton onClick={leave}><OutlineText size="medium">Exit</OutlineText></DialogueChoiceButton>
                    <DialogueChoiceButton onClick={() => setVisible(false)}><OutlineText size="medium">Back</OutlineText></DialogueChoiceButton> */}
        </div>
      </div>
    </PopupClean>
  );
};