import { OutlineText } from "../texts/OutlineText";
import React, { ReactNode, useEffect, useState } from "react";
import { MonsterState } from "/types/single/monsterState";
import { IconButton } from "../buttons/IconButton";

// type for dialog
type ScriptProps = {
  monster: MonsterState;
  lines: string[];
  onEnd: () => void; //call when last line is reached
  onAdvance?: (nextIndex: number) => void; //can be used to change image or add stuff every click
};

// type for buttons
type StaticProps = {
  monster?: MonsterState; //Might be useful in future
  children: ReactNode;
};

type DialogueBoxProps = ScriptProps | StaticProps;

export function DialogueBox(props: DialogueBoxProps) {

    const { monster } = props;

    const isScript = "lines" in props;

    //Check if input is script or button to show according name (monster name/your self)
    const titleText = isScript ? (props as ScriptProps).monster.name
                             : "Your self";

    const dialogBox = 
        `
        bg-peach
        w-[95%]
        xl:w-[60%]
        rounded-tl-[5rem]
        rounded-tr-[5rem]
        border-[10px]
        mx-auto
        border-blackCurrant
        border-b-0
        bottom-0
        flex 
        place-items-center 
        justify-center
        pl-[3%]
        pr-[3%]
        xl:pt-[2%]
        pt-[4%]
        pb-10
        fixed
        xl:h-[35%]
        h-[30%]
        `

    const monsterName = 
        `
        bg-ronchi
        rounded-tl-[2rem]
        rounded-tr-[2rem]
        border-[10px]
        border-blackCurrant
        border-b-0
        place-items-center 
        px-[1rem]
        pb-[73rem]
        xl:pb-[33rem]
        xl:px-[0.5rem]
        pl-[1rem]
        pr-[1rem]
        font-[Jua]
        outline-offset-0
        `


        return(
        <div className="fixed inset-x-0 bottom-0 flex justify-center ">
            <div className="relative w-[95%] xl:w-[60%]">
                <div className="absolute top-0 left-8 sm:left-12 -translate-y-1/2 ">
                    <div className={`${monsterName}`}>
                        <OutlineText size="medium">
                            {titleText}
                        </OutlineText>
                    </div>
                </div>
                <div className={`${dialogBox}`}>
                    {/* check if sialog or button */}
                    {isScript ? <ScriptContent {...(props as ScriptProps)} /> : <StaticContent {...(props as StaticProps)} />}
                </div>
                {/* <div className=" absolute bottom-[3rem] xl:bottom-[2rem] pl-[52rem] xl:pl-[52rem]">
                    <IconButton buttonColour="blue" style="arrowright" iconColour="black" size="small" onClick={onClick}></IconButton>
                </div> */}
            </div>
        </div>
        );

}

function ScriptContent({ lines, onEnd, onAdvance }: ScriptProps) {

  const [i, setI] = useState(0);
  const atEnd = lines.length === 0 || i >= lines.length - 1;

  useEffect(() => setI(0), [lines]);

//   Check if end of the conversation list
  const nextOrEnd = () => {
    if (lines.length === 0) return onEnd();
    if (!atEnd) {
      const ni = i + 1;
      setI(ni);
      onAdvance?.(ni);
    } else {
      onEnd();
    }
  };

  return (
    <>
        <div className="leading-tight">
            <OutlineText size="large">{lines[i] ?? ""}</OutlineText>
        </div>

        <div className=" absolute bottom-[3rem] xl:bottom-[2rem] pl-[52rem] xl:pl-[52rem]">
            <IconButton buttonColour="blue" style="arrowright" iconColour="black" size="small" onClick={nextOrEnd}></IconButton>
        </div>
    </>
  );
}

function StaticContent({ children }: StaticProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-6 flex-wrap">
      {children}
    </div>
  );
}

