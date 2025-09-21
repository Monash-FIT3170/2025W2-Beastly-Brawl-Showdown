import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { ButtonResizableText } from "../../components/buttons/ButtonResizableText";
import { LoginPopup } from "./Login";
import { IconButton } from "../../components/buttons/IconButton";
import { BlackText } from "../../components/texts/BlackText";

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
      <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem] items-center justify-center">
        {!loggedInUser ? (
          //   <IconButton
          //     style="profile"
          //     iconColour="black"
          //     buttonColour="gray"
          //     size="medium"
          //     onClick={() => setShowLogin(true)}
          //   />
          <ButtonGeneric color={"ronchi"} size={"squaremedium"}>
            <div className="flex flex-col ">
              <BlackText size={"tiny"}>LOG</BlackText>
              <BlackText size={"tiny"}>IN</BlackText>
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
      <div className="flex flex-col h-screen lg:p-[1rem] p-[2rem] ">
        <div className="flex flex-row w-full sm:items-end lg:items-center justify-around">
          <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
        </div>
        {/* <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-5 sm:space-y-30"> */}
        <div className="flex flex-col lg:space-y-[1rem] space-y-[3rem] items-center flex-grow justify-center ">
          <BlackText size="tiny">
            Hello [insert username] ! Ready to Brawl?
          </BlackText>
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
          <ButtonGeneric color="ronchi" size="large">
            <OutlineText size="large">EVENTS</OutlineText>
          </ButtonGeneric>

          <div className="flex-row flex space-x-[3rem] lg:space-x-[1rem]">
            <IconButton
              style="info"
              iconColour="black"
              buttonColour="blue"
              size="medium"
              onClick={() => FlowRouter.go("/help")}
            />
            <IconButton
              style="leaderboard"
              iconColour="black"
              buttonColour="redpink"
              size="medium"
              onClick={() => FlowRouter.go("/leaderboard")}
            />
            <IconButton
              style="notes"
              iconColour="black"
              buttonColour="pink"
              size="medium"
              onClick={() => FlowRouter.go("/dev-notes")}
            />
          </div>
        </div>
        {/* </div> */}
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
