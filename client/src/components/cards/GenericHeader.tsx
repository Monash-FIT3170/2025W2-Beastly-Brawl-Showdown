import React, { ReactElement, ReactNode } from "react";

interface HeaderProps {
  children: ReactNode;
  color: "blue" | "purple" | "lightYellow" | "green" | "red" | "cream";
}

export const GenericHeader = ({ children, color }: HeaderProps) => {
  const colorToDisplay = {
    blue: "bg-[#55A9ED]",
    purple: "bg-heliotrope",
    lightYellow: "bg-ronchi",
    green: "bg-conifer",
    red: "bg-burntSienna",
    cream: "bg-peach",
  };

  const header = `
        ${colorToDisplay[color]}
        mx-auto
        text-large
        text-white
        font-[Jua]
        w-[95%]
        xl:w-[60%]
        h-normalPhoneHeight
        rounded-bl-xl
        rounded-br-xl
        border-[4px]
        border-blackCurrant
        border-t-0
        text-center
        text-wrap
        pl-[1%]
        pr-[1%]
        inset-x-0
        sticky
        top-0
        `;

  return <div className={`${header}`}>{children}</div>;
};
