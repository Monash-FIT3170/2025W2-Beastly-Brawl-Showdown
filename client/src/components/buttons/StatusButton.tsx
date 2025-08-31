import React from "react";
import { Status } from "/server/src/model/game/status/status";
import { useState } from "react";
import { StatusPopup } from "../popups/StatusPopup";

export interface StatusButtonProp{
    status: Status;
}

export const StatusButton = ({status}: StatusButtonProp) => {

    const [showStatus, setShowStatus] = useState(false);
    const path = `/assets/statuses/${status.name.toUpperCase()}.png`;
    const Button =
        `
        bg-pictonBlue
        w-[12rem]
        h-[12rem]
        xl:w-[7rem]
        xl:h-[7rem]
        rounded-[1rem]
        items-center
        outline-blackCurrant
        xl:outline-[0.2rem]
        outline-[0.5rem]
        flex
        xl:px-[0.5rem]
        xl:py-[0.5rem]
        px-[1rem]
        py-[1rem]
        `

    return(
        <div>
            <button className={`${Button}`} onClick={() => setShowStatus(true)} >
                <img src={path} ></img>
            </button>
            <StatusPopup status={status} open={showStatus} onClose={() => setShowStatus(false)}></StatusPopup>
        </div>

    );
}