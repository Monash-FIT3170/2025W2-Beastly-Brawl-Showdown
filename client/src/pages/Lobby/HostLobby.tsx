import React, { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { local_url } from "/client/IPtest";
import socket from "../../socket";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import LogoResizable from "../../components/logos/LogoResizable";
import { NameCard } from "../../components/cards/NameCard";
import { BaseCard } from "../../components/cards/BaseCard";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { PlayerState } from "/types/single/playerState";
import { PopupClean } from "../../components/popups/PopupClean";
import { BlackText } from "../../components/texts/BlackText";

// Defines code for the game session
interface HostLobbyProps {
  gameCode?: string;
}

const HostLobby: React.FC<HostLobbyProps> = ({ gameCode }) => {
  const code = gameCode;
  const [players, setPlayers] = useState<PlayerState[]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [exitPopup, setExitPopup] = useState<Boolean>();
  const [errors, setErrors] = useState<string[]>([]);
  const [startPopup, setStartPopup] = useState<Boolean>();
  const [kickPopup, setKickPopup] = useState<string>();
  const [kickName, setKickName] = useState<string>();

  // On reload ask for players and update host
  useEffect(() => {
    if (code) {
      socket.emit("host-game", { gameCode: code });
      socket.emit("get-players", { gameCode: code });
    }

    console.log(`LENGTH: ${socket.listeners("update-players").length}`);
    socket.on("update-players", ({ message, players }) => {
      console.log(message);

      // Update player list
      if (Array.isArray(players)) {
        setPlayers(players);
        setPlayerCount(players.length);
      } else {
        console.error("'players' is not an array", players);
      }
    });
    console.log(`LENGTH: ${socket.listeners("update-players").length}`);

    return () => {
      socket.off("update-players");

      socket.off("update-players");

      console.log("Page is closing/unmounting");
    };
  }, []);

  // BUTTON FUNCTIONS:
  // remove player from game
  const kickPlayer = (playerID: string) => {
    // backend player removal call
    socket.emit("leave-game", { userID: playerID });
  };

  // start game
  const startGame = () => {
    console.log("DEBUGGING: STARTGAME CALLED");
    socket.emit("start-game", { gameCode: code });
  };

  socket.on("start-success", () => {
    console.log("DEBUGGING: STARTGAME SUCCEEDED");
    const codeString = code?.toString();
    FlowRouter.go(`/battles/${codeString}`);
  });

  socket.on("start-failed", (errors: string[]) => {
    console.log("DEBUGGING: STARTGAME FAILED");
    setErrors(errors);
  });

  // deletes game session
  const closeGame = () => {
    // UPDATE: popup asking if they are sure before returning to home
    socket.emit("cancel-game", { gameCode: code });
    // return to home
    FlowRouter.go("/");
  };

  return (
    <BlankPage>
      {/* Responsive header section */}
      <div className="flex flex-row h-1/5 w-full items-center justify-between px-4 pt-4">
        {/* POPUPS */}
        {/* Popup: Confirming whether host wants to exit game. */}
        {exitPopup && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">Exit Game?</OutlineText>
              <BlackText size="large">
                THIS WILL CANCEL THE GAME SESSION, REMOVING ALL PLAYERS, AND END
                ALL BATTLES.
              </BlackText>
              <BlackText size="large">ARE YOU SURE YOU WANT TO EXIT?</BlackText>
              <div className="flex flex-row justify-between items-center">
                <ButtonGeneric
                  size="large"
                  color="blue"
                  onClick={() => setExitPopup(false)}
                >
                  CANCEL
                </ButtonGeneric>
                <ButtonGeneric size="large" color="red" onClick={closeGame}>
                  EXIT
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* Popup: Explaining why Start Game failed. */}
        {errors && errors.length > 0 && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">Matchmaking Failed</OutlineText>
              <BlackText size="large">
                MATCHMAKING HAS FAILED DUE TO THE FOLLOWING REASON(S):
              </BlackText>
              {errors.map((error, idx) => (
                <div className="mt-4">
                  <BlackText size="medium" key={idx}>
                    {error.toUpperCase()}
                  </BlackText>
                </div>
              ))}
              <div className="mt-10 flex flex-col items-center">
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => setErrors([])}
                >
                  BACK
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* Popup: Confirming whether host wants to Start Game.*/}
        {startPopup && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">Start Game?</OutlineText>
              <BlackText size="large">
                ONCE THE GAME HAS STARTED NO NEW PLAYERS MAY JOIN AND
                MATCHMAKING WILL BEGIN
              </BlackText>
              <BlackText size="large">
                ARE YOU SURE YOU WANT TO START?
              </BlackText>
              <div className="flex flex-row justify-between items-center">
                <ButtonGeneric
                  size="large"
                  color="blue"
                  onClick={() => setStartPopup(false)}
                >
                  BACK
                </ButtonGeneric>
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => {
                    setStartPopup(false);
                    startGame();
                  }}
                >
                  CONFIRM
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* Popup: Confirming kick player action 
        UPDATE: should i add the player's name into the pop up?
        */}
        {kickPopup != "" && kickPopup != undefined && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">Kick Player?</OutlineText>
              <BlackText size="large">
                ARE YOU SURE YOU WANNA KICK {kickName?.toUpperCase()}?
              </BlackText>
              <div className="flex flex-row justify-between items-center">
                <ButtonGeneric
                  size="large"
                  color="blue"
                  onClick={() => setKickPopup("")}
                >
                  BACK
                </ButtonGeneric>
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => {
                    kickPlayer(kickPopup);
                    setKickPopup("");
                  }}
                >
                  KICK
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* Logo on the left */}

        <LogoResizable className="h-full w-1/11"></LogoResizable>

        {exitPopup && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">QUIT GAME?</OutlineText>
              <BlackText size="large">
                THIS WILL END ALL END ALL ONGOING BATTLES AND CLOSE THE LOBBY
              </BlackText>
              <BlackText size="large">
                DO YOU WANT TO CONTINUE OR END THE GAME
              </BlackText>
              <div className="flex flex-row justify-between items-center">
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => setExitPopup(false)}
                >
                  BACK
                </ButtonGeneric>
                <ButtonGeneric size="large" color="blue" onClick={closeGame}>
                  CONFIRM
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {errors && errors.length > 0 && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">Matchmaking Failed</OutlineText>
              <BlackText size="large">
                MATCHMAKING HAS FAILED DUE TO THE FOLLOWING REASON(S):
              </BlackText>
              {errors.map((error, idx) => (
                <div className="mt-4">
                  <BlackText size="medium" key={idx}>
                    {error.toUpperCase()}
                  </BlackText>
                </div>
              ))}
              <div className="mt-10 flex flex-col items-center">
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => setErrors([])}
                >
                  BACK
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* Heading in the center */}
        <BaseCard color="springLeaves" width={65} height={5}>
          <OutlineText size="large">
            Join the game at {`${local_url}/join/${code}`}
          </OutlineText>
        </BaseCard>

        {/* QR code on the right */}
        <div className="flex p-1 outline-blackCurrant outline-[0.25rem] rounded-2xl bg-white mt-1">
          <QRCodeSVG
            value={`${local_url}/join/${code}`}
            size={100}
            bgColor="#FFFFFF"
            marginSize={2}
          />
        </div>
      </div>

      {/* Player name+monster cards */}
      {/* Not sure how the monster is being determined yet, so just using a string for now */}
      <div className="flex flex-row h-3/5 w-full items-center justify-between p-[2rem]">
        <div className="flex flex-row h-full w-full justify-around items-center bg-peach outline-blackCurrant outline-[0.25rem] rounded-2xl">
          {players.map((player) => (
            <NameCard
              player={player}
              onClick={() => {
                setKickPopup(player.id);
                setKickName(player.name);
              }}
            />
          ))}
          {/* UPDATE: Add pop up for : Do you want to kick this player? */}
          {/* UPDATE: Add pop up for : Do you want to kick this player? */}
        </div>
      </div>

      {/* Bottom bar with back button, start game button, and player count */}
      <div className="flex flex-row h-1/5 w-full px-10 items-center justify-between">
        <ButtonGeneric
          color="red"
          size="medium"
          onClick={() => setExitPopup(true)}
        >
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <GenericIcon style="arrowleft" colour="stroked" />
            <div className="mt-1">
              <OutlineText size="large">EXIT</OutlineText>
            </div>
          </div>
        </ButtonGeneric>

        <div className="mb-5 mr-13">
          {/* UPDATE: Add pop up for : Do you want to start the game? */}
          {/* UPDATE: Add pop up for : Do you want to start the game? */}
          <ButtonGeneric
            color="ronchi"
            size="large"
            // isDisabled={!canStart}
            onClick={() => setStartPopup(true)}
          >
            <div className="mt-1">
              <OutlineText size="large">START GAME</OutlineText>
            </div>
          </ButtonGeneric>
        </div>

        <div className="mb-20">
          <BaseCard color="peach" width={12} height={4}>
            <OutlineText size="medium">PLAYERS: {playerCount}/8</OutlineText>
          </BaseCard>
        </div>
      </div>

      {/* Debugging button to print socket ID */}
      {/*<button onClick={() => console.log(socket.id)}>Print SocketID</button>*/}
    </BlankPage>
  );
};

export default HostLobby;
