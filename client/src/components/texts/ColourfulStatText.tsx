import React, { ReactNode } from "react";
type SizeKey = "tiny" | "smaller" | "small" | "medium" | "large" | "extraLarge";

interface StatTextProps {
  stat: string;
  statVal: number;
  monsterStat: number;
  className?: string;
  size: SizeKey;
}

export const ColourfulStatText = ({
  stat,
  statVal,
  monsterStat,
  className = "",
  size,
}: StatTextProps) => {
  const sizeLoader: Record<SizeKey, string> = {
    tiny: "text-[2rem] lg:text-tiny",
    smaller: "text-[2rem] lg:text-smaller",
    small: "text-[2.5rem] lg:text-small-abilityButton",
    medium: "text-[3rem] lg:text-medium",
    large: "text-[4rem] lg:text-large sm:text-largemobile",
    extraLarge: "text-[5rem]",
  };

  if (stat === "HP") {
    return (
      <p className={`font-[Jua] text-outline ${className}`}>
        {statVal} {stat}
      </p>
    );
  }

  const diff = statVal - monsterStat;

  return (
    <p className={`font-[Jua] text-outline ${className}`}>
      {monsterStat}
      {diff !== 0 && (
        <>
          {" ("}
          <span
            className={diff > 0 ? "text-outline-green" : "text-outline-red"}
          >
            {diff > 0 ? `+${diff}` : diff}
          </span>
          {")"}
        </>
      )}{" "}
      {stat}
    </p>
  );
};
