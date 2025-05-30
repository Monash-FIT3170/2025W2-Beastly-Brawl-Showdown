
import React, { ReactNode, useEffect, useState } from "react";
import { OutlineText } from "./OutlineText";

interface FadingBattleTextProps {
  size: "tiny" | "small" | 'small-battle-text' | "medium" | "large";
  children?: ReactNode;
  style: React.CSSProperties;
}

export const FadingBattleText = ({
  size,
  children,
  style,
}: FadingBattleTextProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Set a timer to control the fading animation duration
    const animationTimer = setTimeout(() => {
      setIsVisible(false); // Make the component disappear when the timer runs out
    }, 7000); // Duration: 7 seconds

    // Cancel the timer if the fading animation doesn't fully finish
    return () => clearTimeout(animationTimer);
  }, []);

  return (
    isVisible && (
      <div
        className="
                absolute
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                move-up-fade
            "
        style={style}
      >
        <OutlineText size={size}>{children}</OutlineText>
      </div>
    )
  );
};
