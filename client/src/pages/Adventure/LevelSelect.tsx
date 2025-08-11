import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { GenericHeader } from "../../components/cards/GenericHeader";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { IconButton } from "../../components/buttons/IconButton";

interface LevelSelectProps {}

const LevelSelect: React.FC<LevelSelectProps> = () => {
  const [observedLevel, setObservedLevel] = useState<number>(0);

  const alterLevel = (val: number) => {
    setObservedLevel(observedLevel + val);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[100dvh]">
      <GenericHeader color="lightYellow">
        <OutlineText size="extraLarge">START YOUR JOURNEY</OutlineText>
      </GenericHeader>

      <div
        className={`border-[4px] 
            border-blackCurrant w-min h-min rounded-xl
            bg-[#FFE8B1]
            sm:h-min
            sm:w-[95dvw]
            lg:h-min
            lg:w-[90dvw]
            border-[3px]
            border-[#403245]
            rounded-[20px]
            w-[60%]
            box-border`}
      >
        test
      </div>
      <div className="grid grid-cols-3">
        <div>
          {observedLevel != 0 && (
            <IconButton
              style="arrowleft"
              buttonColour="blue"
              iconColour="black"
              size="large"
              onClick={() => alterLevel(-1)}
            />
          )}
        </div>
        <div>
          <ButtonGeneric color="red" size="large">
            BACK
          </ButtonGeneric>
        </div>
        <div>
          {observedLevel != 5 && (
            <IconButton
              style="arrowright"
              buttonColour="blue"
              iconColour="black"
              size="large"
              onClick={() => alterLevel(1)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;
