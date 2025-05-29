import React, { ReactNode, useEffect, useState } from "react";
import { OutlineText } from "./OutlineText";

interface FadingBattleTextProps {
    size: | "tiny" | "medium" | "large";
    children?: ReactNode;
}

export const FadingBattleText = ({size, children}: FadingBattleTextProps) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Set a timer to control the fading animation duration
        const animationTimer = setTimeout(() => {
            setIsVisible(false);  // Make the component disappear when the timer runs out
        }, 2000);  // Duration: 2 seconds

        // Cancel the timer if the fading animation doesn't fully finish
        return () => clearTimeout(animationTimer);
    }, []);

    return (
        isVisible && (
            <div className="
                absolute
                left-1/2
                -translate-x-1/2
                whitespace-nowrap
                move-up-fade
            ">
                <OutlineText size={size}>
                    {children}
                </OutlineText>
            </div>
        )
    );
};
