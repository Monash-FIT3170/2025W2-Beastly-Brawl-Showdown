import { OutlineText } from "../texts/OutlineText";
import React, { ReactNode } from "react";
import { DialogChoiceButton, DialogChoiceButtonProp } from "../buttons/DialogChoiceButton";


export interface DialogueBoxProp{
    text?: string;
    choice?: string[];
}