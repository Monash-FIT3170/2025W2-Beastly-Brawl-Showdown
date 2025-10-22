import React, { useState } from "react";
import { OutlineTextBP } from "../texts/OutlineTextBP";
import { BaseCard } from "../cards/BaseCard";
import { IconButton } from "../buttons/IconButton";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";

interface WikiHeaderProps {
    title: string
}

export const WikiHeader = ({ title }: WikiHeaderProps) => {
    return (
        <div className="flex flex-row w-full h-[10rem] justify-start items-center ">
            <div className="flex md:w-3/16 xl:w-1/4 h-full items-start justify-start pl-[1rem] pt-[1rem]">
                <IconButton
                    style="arrowleft"
                    iconColour="black"
                    buttonColour="red"
                    size="medium"
                    onClick={() => FlowRouter.go(title === "Rules" ? "/" : "/wiki")}
                />
            </div>
            <div className="flex md:w-5/8 xl:w-1/2 h-full items-start justify-center">
            <BaseCard color="peach" width={50} height={8}>
                <OutlineTextBP size="extraLarge">{title}</OutlineTextBP>
            </BaseCard>
            </div>
        </div>
    )
}