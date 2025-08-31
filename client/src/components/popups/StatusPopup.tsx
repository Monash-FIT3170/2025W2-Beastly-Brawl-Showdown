import React from "react";
import { Status } from "/server/src/model/game/status/status";
import { PopupClean } from "./PopupClean";
import { OutlineText } from "../texts/OutlineText";
import { ButtonGeneric } from "../buttons/ButtonGeneric";
import { useState } from "react";


export interface StatusPopupProp{
    status:Status;
    open: boolean;
    onClose?: () => void;
}

export const StatusPopup = ({status, open, onClose}: StatusPopupProp) => {
    if (!open) return null;
    

    const path = `/assets/statuses/${status.getName()}.png`;

    return(
        
        <PopupClean>
            <div className = "items-center flex-col inline-block inline-flex outline-offset-0 relative gap-y-[1rem] xl:gap-y-[0.5rem]">
                <OutlineText size="large" > {status.getName()} </OutlineText>
                    <div className="bg-pictonBlue mt-4 w-[30rem] xl:w-[10rem] h-[30rem] xl:h-[10rem] items-center outline-blackCurrant rounded-[3rem] outline-[0.3rem]">
                        {/* <img src={path} style = {{ width: `30rem xl:10rem`, height: `30rem` }}></img> */}
                        <img src={path} style = {{ width: `30rem xl:10rem`, height: `30rem` }}></img>
                    </div>
                <OutlineText size="choice-text">{status.getDescription()}</OutlineText>
                <div className="bg-[#D9D9D9] mb-4 outline-blackCurrant rounded-[3rem] outline-[0.3rem] items-center justify-around px-[4rem] py-[0.7rem] xl:py-[0.2rem] xl:px-[3rem] ">
                    <OutlineText size="medium">{status.getRemaningTurn()}</OutlineText>
                </div>
                <ButtonGeneric color="red" size="adventure" onClick={() => onClose?.()}><OutlineText size="choice-text">BACK</OutlineText></ButtonGeneric>
            </div>
        </PopupClean>

    )

}