import React from "react";
import { HeaderText } from "../texts/HeaderText";

interface HeaderProps {
  text: string;
}

export const Header = ({ text }: HeaderProps) => {
  return (
    <div className="backgroundHeaderPurple">
      <HeaderText text={text} />
    </div>
  );
};
