import React from "react";

interface HeaderTextProps {
  text: string;
}

export const HeaderText = ({ text }: HeaderTextProps) => {
  return <h1 className="infoTextLarge text-center">{text}</h1>;
};
