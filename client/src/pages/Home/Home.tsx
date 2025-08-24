import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";

export const Home = () => {
  // Called on 'Host Lobby' button press
  const renderConfigPage = () => {
    FlowRouter.go("/host/gamesettings");
  };

  // Called on 'Join Lobby' button press
  const renderJoinLobby = () => {
    FlowRouter.go("/join");
  };

  // Called on 'Adventure' button press
  const renderAdventure = () => {
    FlowRouter.go("/adventure/level-select");
  };

  return (
    console.log("Home"),
    (
      <BlankPage>
        <div className="flex flex-row h-1/2 w-full sm:items-end lg:items-center justify-around">
          <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full"></LogoResizable>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-10 sm:space-y-30">
          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={renderConfigPage}
            mobileHidden={"true"}
          >
            <OutlineText size="large">HOST GAME</OutlineText>
          </ButtonGeneric>
          <ButtonGeneric color="ronchi" size="large" onClick={renderJoinLobby}>
            <OutlineText size="large">JOIN GAME</OutlineText>
          </ButtonGeneric>
          <ButtonGeneric color="ronchi" size="large" onClick={renderAdventure}>
            <OutlineText size="large">ADVENTURE</OutlineText>
          </ButtonGeneric>
        </div>
      </BlankPage>
    )
  );
};
