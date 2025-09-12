import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { LoginPopup } from "./Login";

export const Home = () => {
  // Called on 'Host Lobby' button press
  const renderConfigPage = () => {
    FlowRouter.go("/host/choose-mode");
  };
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);

  useEffect(() => {
    socket.emit("check-login");

    const handleLoginStatus = ({ loggedIn }: { loggedIn: boolean }) => {
      setLoggedInUser(loggedIn);
    };

    socket.on("login-status", handleLoginStatus);
    return () => socket.off("login-status", handleLoginStatus);
  }, []);

  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  socket.on("new-game", ({ code }) => {
    FlowRouter.go(`/host/${code}`);
  });

  const renderJoinLobby = () => FlowRouter.go("/join");
  const renderAdventure = () => FlowRouter.go("/adventure/level-select");

  const handleLoginSuccess = (username: string) => {
    setShowLogin(false);
    setLoggedInUser(true);
  };

  const handleExitLogin = () => {
    setShowLogin(false);
    console.log("Exit login");
  };

  return (
    <BlankPage>
      {/* Top-right login/account button */}
      <div className="absolute top-6 sm:top-10 right-6 sm:right-10 z-50">
        {!loggedInUser ? (
          <ButtonGeneric
            color="ronchi"
            size="large"
            className="w-32 h-12 sm:w-40 sm:h-14"
            onClick={() => setShowLogin(true)}
          >
            <OutlineText size="large">LOGIN</OutlineText>
          </ButtonGeneric>
        ) : (
          <ButtonGeneric
            color="ronchi"
            size="large"
            className="w-32 h-12 sm:w-40 sm:h-14"
            onClick={() => FlowRouter.go("/account")}
          >
            <OutlineText size="large">ACCOUNT</OutlineText>
          </ButtonGeneric>
        )}
      </div>

      {/* Logo section */}
      <div className="flex flex-row h-[40vh] sm:h-[50vh] lg:h-[60vh] w-full items-center justify-center sm:justify-around px-4 sm:px-0">
        <LogoResizable className="w-[80%] sm:w-1/4 max-w-[350px] sm:max-w-[400px]" />
      </div>

      {/* Main buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center w-full sm:w-2/3 lg:w-1/2 gap-4 sm:gap-6 mt-6 sm:mt-10 px-4 sm:px-0">
        <ButtonGeneric
          color="ronchi"
          size="large"
          className="w-56 h-14 sm:w-40 sm:h-14"
          onClick={createGame}
        >
          <OutlineText size="large">HOST</OutlineText>
        </ButtonGeneric>

        <ButtonGeneric
          color="ronchi"
          size="large"
          className="w-56 h-14 sm:w-40 sm:h-14"
          onClick={renderJoinLobby}
        >
          <OutlineText size="large">JOIN</OutlineText>
        </ButtonGeneric>

        <ButtonGeneric
          color="ronchi"
          size="large"
          className="w-56 h-14 sm:w-40 sm:h-14"
          onClick={renderAdventure}
        >
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
