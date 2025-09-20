import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { ButtonResizableText } from "../../components/buttons/ButtonResizableText";
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

    const handleLoginStatus = ({ loggedIn }) => {
      setLoggedInUser(loggedIn);
    };

    socket.on("login-status", handleLoginStatus);

    return () => {
      socket.off("login-status", handleLoginStatus);
    };
  }, []);

  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  const renderJoinLobby = () => {
    FlowRouter.go("/join");
  };

  const renderWiki = () => {
    FlowRouter.go("/wiki");
  };

  const handleLoginSuccess = (username: string) => {
    setShowLogin(false);
    setLoggedInUser(true);
  };

  const handleExitLogin = () => {
    setShowLogin(false);
    console.log("Exit login");
  };

  // Called on 'Adventure' button press
  const renderAdventure = () => {
    FlowRouter.go("/adventure/level-select");
  };

  return (
    <BlankPage>
      <div className="flex flex-row h-1/2 w-full sm:items-end lg:items-center justify-around">
        <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
      </div>
      <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-5 sm:space-y-30">
        {!loggedInUser ? (
          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={() => setShowLogin(true)}
          >
            <OutlineText size="large">LOGIN</OutlineText>
          </ButtonGeneric>
        ) : (
          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={() => FlowRouter.go("/account")}
          >
            <OutlineText size="large">ACCOUNT</OutlineText>
          </ButtonGeneric>
        )}

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
        <ButtonGeneric color="ronchi" size="large" onClick={renderWiki}>
          <OutlineText size="large">RULES</OutlineText>
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
