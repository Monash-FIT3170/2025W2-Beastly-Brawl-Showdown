import React, { useState, useEffect, useRef } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { LoginPopup } from "./Login";
import { IconButton } from "../../components/buttons/IconButton";
import { isBGMEnabled, playBGM,toggleBGM } from "../../audioManager";


export const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    socket.emit("check-login");

    const handleLoginStatus = ({ loggedIn }: { loggedIn: boolean }) => {
      setLoggedInUser(loggedIn);
    };
    socket.on("login-status", handleLoginStatus);

    return () => {
      socket.off("login-status", handleLoginStatus);
    };
  }, []);

  useEffect(() => {
    playBGM("/music/Beastly_brawl_menu_screen_music.mp3");
  }, []);

  const handleToggleMusic = () => {
    const enabled = toggleBGM();
    setMusicOn(enabled);
  };

  const renderConfigPage = () => {

    FlowRouter.go("/host/choose-mode");
  };

  const renderJoinLobby = () => {
;
    FlowRouter.go("/join");
  };

  const renderAdventure = () => {
    FlowRouter.go("/adventure/level-select");
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setLoggedInUser(true);
  };

  const handleExitLogin = () => setShowLogin(false);

  useEffect(() => {
    const handleNewGame = ({ code }: { code: string | number }) => {
      FlowRouter.go(`/host/${code}`);
    };
    socket.on("new-game", handleNewGame);
    return () => socket.off("new-game", handleNewGame);
  }, []);

  return (
    <BlankPage>
      <div className="absolute top-4 left-4 z-50">
        <ButtonGeneric
          onClick={handleToggleMusic}
          color="ronchi"
          size="square"
        >
          {isBGMEnabled() == true ? "🔊"  : "🔇"}
        </ButtonGeneric>
      </div>

      <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem]">
        {!loggedInUser ? (
          <ButtonGeneric
            color="ronchi"
            size="squaremedium"
            onClick={() => setShowLogin(true)}
          >
            <div className="flex flex-col text-center">
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

      {/* Logo */}
      <div className="flex flex-row w-full sm:items-end lg:items-center justify-around">
        <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-5 sm:space-y-30">
        <ButtonGeneric
          color="ronchi"
          size="large"
          onClick={renderConfigPage}
          mobileHidden="true"
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

      {showLogin && (
        <LoginPopup
          onLoginSuccess={handleLoginSuccess}
          setExitPopup={handleExitLogin}
        />
      )}
    </BlankPage>
  );
};

