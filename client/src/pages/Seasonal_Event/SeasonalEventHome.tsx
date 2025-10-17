import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { IconButton } from "../../components/buttons/IconButton";

export const SeasonalEventHome: React.FC = () => {


  return (
    <div
      className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
      style={{
        backgroundImage:
          "url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/FOREST.jpg')",
      }}
    >
      <div className="fixed z-2 lg:ml-5 lg:mt-5 sm:ml-6 sm:mt-6">
        <IconButton
          style="arrowleft"
          iconColour="black"
          buttonColour="red"
          size="medium"
          onClick={() => {
            FlowRouter.go("/");
          }}
        />
      </div>
      <div className="fixed w-full sm:h-[10vh] lg:h-[20vh] flex items-center justify-center invisible lg:visible">
        <div className="bg-ronchi outline-blackCurrant px-[2rem]  outline-consistent rounded-2xl flex flex-col items-center justify-center">
          <OutlineText size="extraLarge">SEASONAL EVENT</OutlineText>
        </div>
      </div>
    </div>
  );
};