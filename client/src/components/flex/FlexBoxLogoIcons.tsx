import React from "react";
import { LogoResizable } from "../logos/LogoResizable";
import { GenericIcon } from "../icons/GenericIcon";
import { IconArrowRight } from "../icons/IconArrowRight";
import { IconArrowUp } from "../icons/IconArrowUp";
import { IconArrowDown } from "../icons/IconArrowDown";
import { IconInfo } from "../icons/IconInfo";
import { IconCog } from "../icons/IconCog";
import { IconX } from "../icons/IconX";
import { IconBars } from "../icons/IconBars";

const FlexBoxLogoIcons: React.FC = () => {  
  return (
    <div className="flex flex-col md:flex-row justify-center items-center bg-peach w-2/3 h-72 m-1 rounded-2xl" style={{ width: "calc(66.6666666667% + 8px)" }}>
      <div className="flex w-full items-center mx-20 space-x-40">
        <LogoResizable height={16} width={16}/>
        <div className="flex flex-col justify-around h-full">
          <p className="font-jua text-blackCurrant text-tiny">Icons</p>
          <div className="flex w-full justify-center m-4 gap-8 mx-8">
            <GenericIcon />
            <IconArrowRight />
            <IconArrowUp />
            <IconArrowDown />
          </div>
          <div className="flex w-full justify-center m-4 gap-8 mx-8">
            <IconInfo />
            <IconCog />
            <IconX />
            <IconBars />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlexBoxLogoIcons;