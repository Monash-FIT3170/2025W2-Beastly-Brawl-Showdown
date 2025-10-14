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
import { PopupClean } from "../../components/popups/PopupClean";
import { userInfo } from "os";

export const Home = () => {
  // Called on 'Host Lobby' button press
  const renderConfigPage = () => {
    FlowRouter.go("/host/choose-mode");
  };
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [adventurePopup, setAdventurePopup] = useState(false);

  useEffect(() => {
    // Ask server for login status
    socket.emit("check-login");

    const handleLoginStatus = ({ loggedIn }: { loggedIn: boolean }) => {
      setLoggedInUser(loggedIn);
    };

    socket.on("login-status", handleLoginStatus);

    return () => socket.off("login-status", handleLoginStatus);
  }, []);


  useEffect(() => {
    const handleNewGame = ({ code }: { code: string }) => {
      FlowRouter.go(`/host/${code}`);
    };

    socket.on("new-game", handleNewGame);
    return () => socket.off("new-game", handleNewGame);
  }, []);

  const createGame = () => {
    //this is not used?
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
  const handleAdventure = () => {
    if (loggedInUser) {
      renderAdventure();
    } else {
      setAdventurePopup(true);
    }
  };

  const renderAdventure = () => {
    FlowRouter.go("/adventure/mode-select");
  };

  return (
    <BlankPage>
      <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem] items-center justify-center">
        {adventurePopup && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">Play Adventure?</OutlineText>
              <BlackText size="large">
                YOU ARE NOT LOGGED IN. YOU CAN PLAY ADVENTURE, BUT NO PROGRESS
                WILL BE SAVED.
              </BlackText>
              <div className="flex flex-row justify-center gap-[2rem] pt-[2rem] items-center">
                <ButtonGeneric
                  size="medium"
                  color="red"
                  onClick={() => setAdventurePopup(false)}
                >
                  <OutlineText size="choice-text"> BACK </OutlineText>
                </ButtonGeneric>
                <ButtonGeneric
                  size="medium"
                  color="blue"
                  onClick={renderAdventure}
                >
                  <OutlineText size="choice-text"> CONTINUE </OutlineText>
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}
        {!loggedInUser ? (
          <ButtonGeneric
            color={"ronchi"}
            size={"squaremedium"}
            onClick={() => FlowRouter.go("/login")}
          >
            <div className="flex flex-col ">
              <OutlineText size={"tiny"}>LOG</OutlineText>
              <OutlineText size={"tiny"}>IN</OutlineText>
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
      <div className="flex flex-col h-screen lg:p-[1rem] p-[2rem] overflow-auto">
        <div className="flex flex-row w-full sm:items-end lg:items-center justify-around">
          <LogoResizable className="lg:w-1/4 sm:h-3/4 lg:h-full" />
        </div>
        <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem] items-center justify-center">
          {adventurePopup && (
            <PopupClean>
              <div className="flex flex-col justify-around">
                <OutlineText size="extraLarge">Play Adventure?</OutlineText>
                <BlackText size="large">
                  YOU ARE NOT LOGGED IN. YOU CAN PLAY ADVENTURE, BUT NO PROGRESS
                  WILL BE SAVED.
                </BlackText>
                <div className="flex flex-row justify-center gap-[2rem] pt-[2rem] items-center">
                  <ButtonGeneric
                    size="medium"
                    color="red"
                    onClick={() => setAdventurePopup(false)}
                  >
                    <OutlineText size="choice-text"> BACK </OutlineText>
                  </ButtonGeneric>
                  <ButtonGeneric
                    size="medium"
                    color="blue"
                    onClick={renderAdventure}
                  >
                    <OutlineText size="choice-text"> CONTINUE </OutlineText>
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          )}
          {!loggedInUser ? (
            <ButtonGeneric
              color={"ronchi"}
              size={"squaremedium"}
              onClick={() => setShowLogin(true)}
            >
              <div className="flex flex-col ">
                <OutlineText size={"tiny"}>LOG</OutlineText>
                <OutlineText size={"tiny"}>IN</OutlineText>
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
        {/* <div className="flex flex-col items-center justify-center w-1/2 h-1/2 lg:space-y-5 sm:space-y-30"> */}
        <div className="flex flex-col lg:space-y-[1rem] space-y-[3rem] items-center flex-grow justify-center ">
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
          <ButtonGeneric color="ronchi" size="large" onClick={handleAdventure}>
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
    </BlankPage>
  );
};
