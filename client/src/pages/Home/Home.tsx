import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { LoginPopup } from "./Login";
import { IconButton } from "../../components/buttons/IconButton";
import {
  initHomeMusic,
  unmuteHomeMusic,
  stopHomeMusic,
  toggleMute,
  isMuted,
} from "../../audioController";

export const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [muted, setMuted] = useState(isMuted());

  // initialize music on mount
  useEffect(() => {
    initHomeMusic();

    socket.emit("check-login");
    const handleLoginStatus = ({ loggedIn }) => setLoggedInUser(loggedIn);
    socket.on("login-status", handleLoginStatus);

    return () => {
      socket.off("login-status", handleLoginStatus);
      stopHomeMusic(); // stop if leaving to gameplay
    };
  }, []);

  // unmute when any button is clicked
  const handleUserAction = (callback: () => void) => {
    unmuteHomeMusic();
    callback();
  };

  const renderConfigPage = () => handleUserAction(() => FlowRouter.go("/host/choose-mode"));
  const renderJoinLobby = () => handleUserAction(() => FlowRouter.go("/join"));
  const renderAdventure = () => handleUserAction(() => FlowRouter.go("/adventure/level-select"));

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setLoggedInUser(true);
  };

  const handleExitLogin = () => setShowLogin(false);

  const handleMuteToggle = () => {
    toggleMute();
    setMuted(isMuted());
  };

  return (
    <BlankPage>
      <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem] items-center justify-center">
        {!loggedInUser ? (
          <ButtonGeneric
            color="ronchi"
            size="squaremedium"
            onClick={() => setShowLogin(true)}
          >
            <div className="flex flex-col ">
              <OutlineText size="tiny">LOG</OutlineText>
              <OutlineText size="tiny">IN</OutlineText>
            </div>
          </ButtonGeneric>
        ) : (
          <IconButton
            style="profile"
            iconColour="black"
            buttonColour="ronchi"
            size="medium"
            onClick={() => FlowRouter.go("/account")}
          />
        )}
      </div>

      {/* Optional mute/unmute toggle */}
      <div className="absolute top-[3rem] left-[3rem]">
        <ButtonGeneric color="ronchi" size="small" onClick={handleMuteToggle}>
          <OutlineText size="tiny">{muted ? "UNMUTE" : "MUTE"}</OutlineText>
        </ButtonGeneric>
      </div>

      <div className="flex flex-row w-full sm:items-end lg:items-center justify-around">
        <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
      </div>

      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-5 sm:space-y-30">
        <ButtonGeneric color="ronchi" size="large" onClick={renderConfigPage} mobileHidden="true">
          <OutlineText size="large">HOST GAME</OutlineText>
        </ButtonGeneric>

        <ButtonGeneric color="ronchi" size="large" onClick={renderJoinLobby}>
          <OutlineText size="large">JOIN GAME</OutlineText>
        </ButtonGeneric>

        <ButtonGeneric color="ronchi" size="large" onClick={renderAdventure}>
          <OutlineText size="large">ADVENTURE</OutlineText>
        </ButtonGeneric>
      </div>

      {showLogin && (
        <LoginPopup
          onLoginSuccess={handleLoginSuccess}
          setExitPopup={handleExitLogin}
        />
      )}
    </BlankPage>
  );
};
