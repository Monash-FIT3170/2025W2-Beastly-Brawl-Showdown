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
  const [canStart, setCanStart] = useState(false);
  const [exit, setExit] = useState<Boolean>();

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
        // because list has come from socket need to map it to our player.ts type
        // lmk if i'm wrong
        // const properPlayers = players.map((p: any) => new Player(p.id, p.name));
        // console.log("newly mapped players:", properPlayers); //testing
        setPlayers(players);
        setPlayerCount(players.length);
      } else {
        console.error("'players' is not an array", players);
      }
    });
    console.log(`LENGTH: ${socket.listeners("update-players").length}`);

    return () => {
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
  // TODO: MAKE SURE START GAME CAN ONLY BEGIN ONCE ALL PLAYERS HAVE SELECTED A MONSTER AND IN THE WAITING ROOM!
  const startGame = () => {
    socket.emit("start-game", { gameCode: code });
    const codeString = code?.toString();
    FlowRouter.go(`/battles/${codeString}`);
  };

  // deletes game session
  const closeGame = () => {
    // UPDATE: popup asking if they are sure before returning to home
    socket.emit("cancel-game", { gameCode: code });
    // return to home
    FlowRouter.go("/");
  };

  //UPDATE: why is this not called
  const canStartGame = (players: PlayerState[]) => {
    if (players.length < 2) {
      return false; // If less than 2 players, cannot start
    }

    for (let i = 0; i < players.length; i++) {
      if (players[i].monster === null) {
        return false; // If any player does not have a monster selected, cannot start
      }
    }
    return true;
  };

  return (
    <BlankPage>
      {/* Responsive header section */}
      <div className="flex flex-row h-1/5 w-full items-center justify-between px-4 pt-4">
        {/* Logo on the left */}

        <LogoResizable className="h-full w-1/11"></LogoResizable>

        {exit && (
        <PopupClean>
          <div className="flex flex-col justify-around">
          <OutlineText size = 'extraLarge'>QUIT GAME?</OutlineText>
          <BlackText size = 'large'>THIS WILL END ALL END ALL ONGOING BATTLES AND CLOSE THE LOBBY</BlackText>
          <BlackText size = 'large'>DO YOU WANT TO CONTINUE OR END THE GAME</BlackText>
          <div className="flex flex-row justify-between items-center">
            <ButtonGeneric size = 'large' color = 'red' onClick={() => setExit(false)}>BACK</ButtonGeneric>
            <ButtonGeneric size="large" color="blue" onClick={closeGame}>CONFIRM</ButtonGeneric>
          </div>
          </div>
        </PopupClean>)}

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
            <NameCard player={player} onClick={() => kickPlayer(player.id)} />
          ))}
        </div>
      </div>

      {/* Bottom bar with back button, start game button, and player count */}
      <div className="flex flex-row h-1/5 w-full px-10 items-center justify-between">
        <ButtonGeneric color="blue" size="medium" onClick={() => setExit(true)}>
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <GenericIcon style="arrowleft" colour="stroked" />
            <div className="mt-1">
              <OutlineText size="large">BACK</OutlineText>
            </div>
          </div>
        </ButtonGeneric>

        <div className="mb-5 mr-13">
          <ButtonGeneric
            color="ronchi"
            size="large"
            isDisabled={playerCount < 2}
            onClick={startGame}
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
