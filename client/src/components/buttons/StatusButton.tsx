import React from "react";
import { Status } from "/server/src/model/game/status/status";
import { useState } from "react";
import { StatusPopup } from "../popups/StatusPopup";
import { OutlineText } from "../texts/OutlineText";

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
        flex-col

        xl:py-[1.2rem]
        overflow-visible

        py-[1rem]
        gap-y-[0.2rem]


        `
    const Circle = 
        `
        absolute
        bottom-0
        rounded-full
        bg-[#FFE07C]
        xl:w-[2rem]
        xl:h-[2rem]
        h-[4rem]
        w-[4rem]
        outline-blackCurrant
        xl:outline-[0.2rem]
        outline-[0.5rem]
        flex
        items-center
        justify-center
        xl:text-sm
        text-[3rem]
        font-jua
        overflow-visible
        z-30
        `

    return(
        <div className="gap-y-[0rem] flex flex-col items-center justify-center pb-[1.6rem] xl:pb-[1rem] pt-[1rem] relative w-full">
            {/* <div className = "absolute overflow-visible z-30 top-0 ">
                    <OutlineText size = "medium">{status.name}</OutlineText>
                </div> */}
            {/* <div className = "overflow-visible z-30 relative top-0 absolute justify-center flex w-full">
                <OutlineText size = "medium">{status.name}</OutlineText>
            </div> */}
            <button className={`${Button}`} onClick={() => setShowStatus(true)} >
                <div className = "absolute overflow-visible z-30 top-[1rem] ">
                    <OutlineText size = "midsmall">{status.name}</OutlineText>
                </div>
                <div className="py-[2rem] xl:py-[0.1rem] px-[3rem] xl:px-[1.3rem]">
                <img src={path} ></img>
                </div>
                <div className={`${Circle}`}>
                    {status.countDown}
                </div>
            </button>
            {/* <div className={`${Circle}`}>
                    {status.countDown}
            </div> */}
            <StatusPopup status={status} open={showStatus} onClose={() => setShowStatus(false)}></StatusPopup>
        </div>

    );
}