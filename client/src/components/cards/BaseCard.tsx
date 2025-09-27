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
  return (
    <div
      className={`bg-${color} flex items-center justify-around border-[4px] border-blackCurrant w-min h-min rounded-xl ${className}`}
      style={{
        width: width ? `${width}rem` : undefined,
        height: height ? `${height}rem` : undefined,
      }}
    >
      {children}
    </div>
  );
};
