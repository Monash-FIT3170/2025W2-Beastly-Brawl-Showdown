import React from "react";

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl";
}

const sizeClasses: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "w-20 h-20", // 80px
  md: "w-36 h-36", // 144px
  lg: "w-52 h-52", // 208px
  xl: "w-72 h-72", // 288px
  "2xl": "w-96 h-96", // 384px
  "3xl": "w-120 h-120", // 480px
  "4xl": "w-144 h-144", // 576px
  "5xl": "w-160 h-160", // 640px
};

export const LogoDisplay = ({ size = "md" }: LogoProps) => {
  return (
    <div className="flex justify-center items-center">
      <img
        src="/logo.png"
        alt="Logo"
        className={`object-contain ${sizeClasses[size]}`}
      />
    </div>
  );
};
