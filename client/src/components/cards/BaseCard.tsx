import React, { ReactNode } from "react";

interface BaseCardProps {
  color: string;
  children?: ReactNode;
  width?: number;
  height?: number;
  className?: string;
}

export const BaseCard = ({
  color,
  children,
  width,
  height,
  className,
}: BaseCardProps) => {
  const colorLoader: Record<string, string> = {
    pictonBlue: "bg-pictonBlue",
    ronchi: "bg-ronchi",
    terracotta: "bg-terracotta",
    goldenRod: "bg-goldenRod",
    peach: "bg-peach",
    springLeaves: "bg-springLeaves",
    schoolBusYellow: "bg-schoolBusYellow",
    quillGray: "bg-quillGray",
    rhino: "bg-rhinoBlue",
    bandit: "bg-banditPurple",
    cinderTail: "bg-cinderTailRed",
    flipper: "bg-flipperBlue",
    pogo: "bg-pogoGreen",
    cobra: "bg-cobraYellow",
  };

  return (
    <div
      className={`${colorLoader[color]} flex items-center justify-around border-[4px] border-blackCurrant w-min h-min rounded-xl ${className}`}
      style={{
        width: width ? `${width}rem` : undefined,
        height: height ? `${height}rem` : undefined,
      }}
    >
      {children}
    </div>
  );
};
