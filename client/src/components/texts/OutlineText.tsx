import React, { ReactNode } from "react";

interface OutlineTextProps {
  size:
    | "tiny"
    | "small"
    | "midsmall"
    | "medium"
    | "mediumLarge"
    | "medium-battle-text"
    | "choice-text"
    | "large"
    | "extraLarge"
    | "monsterSelect"
    | "inventory";
  children?: ReactNode;
  color?: string; // Optional color class
}

export const OutlineText = ({ children, size, color }: OutlineTextProps) => {
  const sizeLoader: Record<string, string> = {
    tiny: "text-[2rem] lg:text-[1.5rem]",
    small: "text-[1.5rem] lg:text-[2rem]",
    midsmall: "text-[2rem] lg:text-small",
    medium: "text-[3rem] lg:text-medium",
    mediumLarge: "text-[3.5rem] lg:text-[3.75rem]",
    "medium-battle-text": "text-[2rem] lg:text-medium-battle-text",
    "choice-text": "text-[4rem] lg:text-large",
    large: "text-[4rem] lg:text-large sm:text-largemobile",
    extraLarge: "text-[5rem]",
    monsterSelect: "lg:text-[5rem] sm:text-[4.2rem]",
    inventory: "text-[2.6rem] lg:text-medium",
  };

  return (
    <p className={`${sizeLoader[size]} font-[Jua] text-outline ${color || ""}`}>
      {children}
    </p>
  );
};
