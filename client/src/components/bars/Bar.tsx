import React from "react";

interface BarProps {
    colour: string;
    text: string;
    textPosition: string;
    radius: string;
    fillPercentage: number;
}

/*
 * TailwindCSS requires that using percentages for setting widths
 * need to be explicity defined in the code. That means something
 * dynamic like "w-%{percentageFill}" on its own won't work. Thus,
 * we need to define percentages manually.
 */
const BarFillPercentagesDefinitions = () => (
  <div className="hidden">
    <div className="
      w-[0%] w-[1%] w-[2%] w-[3%] w-[4%] w-[5%] w-[6%] w-[7%] w-[8%] w-[9%]
      w-[10%] w-[11%] w-[12%] w-[13%] w-[14%] w-[15%] w-[16%] w-[17%] w-[18%] w-[19%]
      w-[20%] w-[21%] w-[22%] w-[23%] w-[24%] w-[25%] w-[26%] w-[27%] w-[28%] w-[29%]
      w-[30%] w-[31%] w-[32%] w-[33%] w-[34%] w-[35%] w-[36%] w-[37%] w-[38%] w-[39%]
      w-[40%] w-[41%] w-[42%] w-[43%] w-[44%] w-[45%] w-[46%] w-[47%] w-[48%] w-[49%]
      w-[50%] w-[51%] w-[52%] w-[53%] w-[54%] w-[55%] w-[56%] w-[57%] w-[58%] w-[59%]
      w-[60%] w-[61%] w-[62%] w-[63%] w-[64%] w-[65%] w-[66%] w-[67%] w-[68%] w-[69%]
      w-[70%] w-[71%] w-[72%] w-[73%] w-[74%] w-[75%] w-[76%] w-[77%] w-[78%] w-[79%]
      w-[80%] w-[81%] w-[82%] w-[83%] w-[84%] w-[85%] w-[86%] w-[87%] w-[88%] w-[89%]
      w-[90%] w-[91%] w-[92%] w-[93%] w-[94%] w-[95%] w-[96%] w-[97%] w-[98%] w-[99%]
      w-[100%]
    " />
  </div>
);

// TODO: Need to find a better way to do this
const BarColoursDefinitions = () => (
  <div className="hidden">
    <div className="
      bg-neongreen
      bg-plainyellow
      bg-sharpred
      bg-customblue
    " />
  </div>
);

export const Bar = ({colour, text, textPosition, radius, fillPercentage}: BarProps) => {
    let backgroundColour = "bg-" + colour + " border-darkpurple";
    let margins = "mx-[-2px] my-[-2px] border-2 rounded-" + radius;
    if (fillPercentage <= 0) {
        backgroundColour = "bg-lightergrey border-lightergrey";
    } else if (fillPercentage >= 100) {
        margins = "rounded-sm";
        fillPercentage = 97;
    }

    let sidePadding;
    if (textPosition == "left") {
      sidePadding = "pl-[4%]";
      textPosition = "text-left";
    } else if (textPosition == "right") {
      sidePadding = "pr-[3%]";
      textPosition = "text-right";
    }
  
    if (radius == "lg") {
      radius = "rounded-lg";  // Had to manually define this string since the app doesn't detect this
    } else {
      radius = "rounded-" + radius;
    }

    return (
        <div className={`
            relative
            w-50
            h-7.5
            bg-lightergrey
            border-darkpurple
            border-2
            ${radius}
            overflow-hidden
        `}>
            <div className={`
                absolute
                w-[${fillPercentage + 3}%]
                h-7.5
                font-[Jua]
                text-white
                pt-[1%]
                ${textPosition}
                ${sidePadding}
                ${margins}
                ${backgroundColour}
            `}>{text}</div>
            <BarFillPercentagesDefinitions />
            <BarColoursDefinitions />
        </div>
    );
}
