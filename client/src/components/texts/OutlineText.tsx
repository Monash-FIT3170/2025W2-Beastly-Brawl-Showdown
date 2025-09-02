import React, { ReactNode } from "react";

interface OutlineTextProps {
  size:
    | "tiny"
    | "small"
    | "medium"
    | "medium-battle-text"
    | "choice-text"
    | "large"
    | "extraLarge"
    | "monsterSelect";
  children?: ReactNode;
}

const BASE_SCREEN_WIDTH = 1920;

export const OutlineText = ({ children, size }: OutlineTextProps) => {
  const sizeLoader: Record<string, number> = {
    tiny: 12,
    small: 16,
    medium: 24,
    "medium-battle-text": 20,
    "choice-text": 32,
    large: 40,
    extraLarge: 48,
    monsterSelect: 36,
  };

  const fontSize = `${(sizeLoader[size] / BASE_SCREEN_WIDTH) * 100}vw`;

  return (
    <p style={{ fontSize }} className="font-[Jua] text-outline">
      {children}
    </p>
  );
};
