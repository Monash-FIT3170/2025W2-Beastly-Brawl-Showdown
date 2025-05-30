import React, { ReactNode } from "react";

interface GenericBarProps {
    colour: BarColour;
    cornerRadius: BarCornerRadius;
    textPosition: BarTextPosition;
    fillPercentage: BarFillPercentage;
    children?: ReactNode;
}

export const GenericBar = ({colour, cornerRadius, textPosition, fillPercentage, children}: GenericBarProps) => {
    const colourToDisplay: Record<string, string> = {
        "green": "bg-conifer",
        "yellow": "bg-schoolBusYellow",
        "red": "bg-burntSienna",
        "blue": "bg-pictonBlue",
        "terracotta": "bg-terracotta"
    };

    const cornerRadiusToDisplay: Record<string, string> = {
        "light": "rounded-[0.5rem]",
        "heavy": "rounded-[2rem]"
    };

    const textPositionToDisplay: Record<string, string> = {
        "left": "justify-start pl-[3%]",
        "right": "justify-end pr-[3%]",
        "none": ""
    };

    const fillPercentageToDisplay: Record<number, string> = {
        0: "w-[0%]", 1: "w-[1%]", 2: "w-[2%]", 3: "w-[3%]", 4: "w-[4%]", 5: "w-[5%]", 6: "w-[6%]", 7: "w-[7%]", 8: "w-[8%]", 9: "w-[9%]",
        10: "w-[10%]", 11: "w-[11%]", 12: "w-[12%]", 13: "w-[13%]", 14: "w-[14%]", 15: "w-[15%]", 16: "w-[16%]", 17: "w-[17%]", 18: "w-[18%]", 19: "w-[19%]",
        20: "w-[20%]", 21: "w-[21%]", 22: "w-[22%]", 23: "w-[23%]", 24: "w-[24%]", 25: "w-[25%]", 26: "w-[26%]", 27: "w-[27%]", 28: "w-[28%]", 29: "w-[29%]",
        30: "w-[30%]", 31: "w-[31%]", 32: "w-[32%]", 33: "w-[33%]", 34: "w-[34%]", 35: "w-[35%]", 36: "w-[36%]", 37: "w-[37%]", 38: "w-[38%]", 39: "w-[39%]",
        40: "w-[40%]", 41: "w-[41%]", 42: "w-[42%]", 43: "w-[43%]", 44: "w-[44%]", 45: "w-[45%]", 46: "w-[46%]", 47: "w-[47%]", 48: "w-[48%]", 49: "w-[49%]",
        50: "w-[50%]", 51: "w-[51%]", 52: "w-[52%]", 53: "w-[53%]", 54: "w-[54%]", 55: "w-[55%]", 56: "w-[56%]", 57: "w-[57%]", 58: "w-[58%]", 59: "w-[59%]",
        60: "w-[60%]", 61: "w-[61%]", 62: "w-[62%]", 63: "w-[63%]", 64: "w-[64%]", 65: "w-[65%]", 66: "w-[66%]", 67: "w-[67%]", 68: "w-[68%]", 69: "w-[69%]",
        70: "w-[70%]", 71: "w-[71%]", 72: "w-[72%]", 73: "w-[73%]", 74: "w-[74%]", 75: "w-[75%]", 76: "w-[76%]", 77: "w-[77%]", 78: "w-[78%]", 79: "w-[79%]",
        80: "w-[80%]", 81: "w-[81%]", 82: "w-[82%]", 83: "w-[83%]", 84: "w-[84%]", 85: "w-[85%]", 86: "w-[86%]", 87: "w-[87%]", 88: "w-[88%]", 89: "w-[89%]",
        90: "w-[90%]", 91: "w-[91%]", 92: "w-[92%]", 93: "w-[93%]", 94: "w-[94%]", 95: "w-[95%]", 96: "w-[96%]", 97: "w-[97%]", 98: "w-[98%]", 99: "w-[99%]",
        100: "w-[100%]"
    };

    const baseBackBarProperties = `
        absolute
        top-0
        left-0
        z-0
        w-full
        h-full
        border-3
        border-blackCurrant
        bg-alto
    `;

    let baseFrontBarProperties = `
        absolute
        top-0
        left-0
        z-10
        h-full
        border-3
        flex
        items-center
        justify-center
        transition-[width]
        duration-300
        ease-in-out
    `;

    // Make the coloured portion of the bar completely disappear if its fill percentage is zero
    if (fillPercentage == 0) {
        baseFrontBarProperties += `border-transparent`
    } else {
        baseFrontBarProperties += `border-blackCurrant ${colourToDisplay[colour]}`;
    }

    return (
        <div className="relative w-full h-12">
            <div className={`
                ${baseBackBarProperties}
                ${cornerRadiusToDisplay[cornerRadius]}
            `} />
            <div className={`
                ${baseFrontBarProperties}
                ${cornerRadiusToDisplay[cornerRadius]}
                ${textPositionToDisplay[textPosition]}
                ${fillPercentageToDisplay[fillPercentage]}
            `}>
                <div className="leading-none pt-[0.25rem]">
                    {children}
                </div>
            </div>
        </div>
    );
};