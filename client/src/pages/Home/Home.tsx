import React, { useState, useEffect, useRef } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { LoginPopup } from "./Login";
import { IconButton } from "../../components/buttons/IconButton";
import { playBGM, playSFX } from "../../audioManager";

export const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // --- Check login on mount
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

  // --- Setup background music
  useEffect(() => {
    const audio = new Audio("/music/Beastly_brawl_menu_screen_music.mp3");
    audio.loop = true;
    audio.volume = 0.5;


    // Keep global reference
    (window as any).homeMusic = audio;
    audioRef.current = audio;

    return () => {
      audio.pause();
    };
  }, []);

  // --- Triggered by button press to allow playback
  const handleStartMusic = () => {
    const audio = (window as any).homeMusic;
    if (audio) {
      audio.play()
        .then(() => {
          console.log(" Music is playing!");
          setMusicStarted(true);
        })
        .catch((err: any) => {
          console.error("Failed to play music:", err);
        });
    }
  };


  const renderConfigPage = () => {
    playSFX("click");
    FlowRouter.go("/host/choose-mode");
  };

  const renderJoinLobby = () => {
    playSFX("click");
    FlowRouter.go("/join");
  };

  const renderAdventure = () => {
    playSFX("click");
    FlowRouter.go("/adventure/level-select");
  };

  const handleLoginSuccess = (username: string) => {
    setShowLogin(false);
    setLoggedInUser(true);
  };

  const handleExitLogin = () => {
    setShowLogin(false);
    console.log("Exit login");
  };

  // --- Game creation event
  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  // --- Render
  return (
    <BlankPage>
      {/* Login button or profile icon */}
      <div className="absolute lg:top-[3rem] lg:right-[3rem] top-[5rem] right-[5rem] items-center justify-center">
        {!loggedInUser ? (
          <ButtonGeneric
            color="ronchi"
            size="squaremedium"
            onClick={() => setShowLogin(true)}
          >
            <div className="flex flex-col">
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

      {/* Main buttons */}
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

      {/* Music start button (only needed once) */}
      <div className="flex flex-col items-center justify-center mt-10">
        <button
          onClick={handleStartMusic}
          className="bg-yellow-400 px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition"
        >
          {musicStarted ? "Music Playing 🎵" : "Click to Start Music"}
        </button>
      </div>

      {/* Login popup */}
      {showLogin && (
        <LoginPopup
          onLoginSuccess={handleLoginSuccess}
          setExitPopup={handleExitLogin}
        />
      )}
    </BlankPage>
  );
};
