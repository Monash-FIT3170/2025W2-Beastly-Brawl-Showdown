import React from "react";
import { IconX } from "../../icons/IconX";

interface NameCardProps {
    name: string;
}

export const NameCardYellow = ({name}: NameCardProps) => {

    return (
        <div className="flex flex-row items-center bg-maybeyellow w-26 h-8 p-1 border-[2px] border-darkpurple rounded-2xl">
            <p className="font-jua text-darkpurple">{name}</p>
            <IconX />
        </div>
    );
};