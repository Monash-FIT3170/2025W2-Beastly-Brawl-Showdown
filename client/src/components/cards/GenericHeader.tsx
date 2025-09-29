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
  w-[95%]        /* default width on mobile */
  sm:w-[90%]     /* small screens (>=640px) */
  md:w-[75%]     /* medium screens (>=768px) */
  lg:w-[65%]     /* large screens (>=1024px) */
  xl:w-[60%]     /* extra large screens (>=1280px) */
  max-w-[95dvw]
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
  fixed
  top-0
`;

  return <div className={`${header}`}>{children}</div>;
};
