import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";

export const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Ask server for login status
    socket.emit("check-login");

    const handleLoginStatus = ({ loggedIn }: { loggedIn: boolean }) => {
      setLoggedInUser(loggedIn);
      setLoading(false); // Done loading once we get response
    };

    socket.on("login-status", handleLoginStatus);

    return () => socket.off("login-status", handleLoginStatus);
  }, []);

  const renderConfigPage = () => FlowRouter.go("/host/choose-mode");
  const renderJoinLobby = () => FlowRouter.go("/join");
  const renderAdventure = () => FlowRouter.go("/adventure/level-select");

  useEffect(() => {
    const handleNewGame = ({ code }: { code: string }) => {
      FlowRouter.go(`/host/${code}`);
    };

    socket.on("new-game", handleNewGame);
    return () => socket.off("new-game", handleNewGame);
  }, []);

  return (
    <BlankPage>
      {/* Top-right login/account button */}
      <div className="w-full flex justify-end items-start pt-2 pr-2 sm:pt-3 sm:pr-3">
        {loading ? (
          // Render nothing or a placeholder while loading
          <div className="w-[6rem] h-[3rem]" />
        ) : !loggedInUser ? (
          <ButtonGeneric
            color="ronchi"
            size="large"
            onClick={() => FlowRouter.go("/login")}
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
      </div>

      {/* Logo section */}
      <div className="flex flex-row h-1/2 w-full sm:items-end lg:items-center justify-around">
        <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
      </div>

      {/* Main buttons */}
      <div className="flex flex-col items-center justify-center w-full lg:w-1/2 space-y-3 sm:space-y-5 lg:space-y-5">
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
  );
};
