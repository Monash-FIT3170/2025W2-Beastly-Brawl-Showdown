import React, { useState, useEffect } from "react";
import Player from "../../types/player";
import { LogoDisplay } from "../../components/logo/Logo";
import { QRCodeSVG } from "qrcode.react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { local_url } from "/client/IPtest";
import socket from "../../socket";

// Defines code for the game session
interface HostLobbyProps {
  gameCode?: string;
}

const HostLobby: React.FC<HostLobbyProps> = ({ gameCode }) => {
  const code = gameCode;
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState(0);

  // On reload ask for players and update host
  useEffect(() => {
    if (code) {
      socket.emit("host-game", { gameCode: code });
      socket.emit("get-players", { gameCode: code });
    }

    return () => {
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

  // LISTENERS:
  // Listen for the "update-players" event from the server
  socket.on("update-players", ({ message, players }) => {
    console.log(message);

    // Update player list
    console.log("players from server:", players); //testing
    if (Array.isArray(players)) {
      setPlayers(players);
      setPlayerCount(players.length);
    } else {
      console.error("'players' is not an array", players);
    }
  });

  return (
    <div className="min-h-screen p-4">
      {/* Responsive header section */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <LogoDisplay size="xl" />
        </div>

        {/* Heading in the center */}
        <div className="flex-1 min-w-[200px] text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold break-words">
            Join The Game! <p></p> <br className="sm:hidden" />
            {`${local_url}/join/${code}`}
          </h2>
        </div>

        {/* QR code on the right */}
        <div className="flex-shrink-0">
          <QRCodeSVG
            value={`${local_url}/join/${code}`}
            size={220}
            bgColor="#FFFFFF"
            marginSize={2}
          />
        </div>
      </div>

      {/* Lobby Info */}
      <div className="mt-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
          {players.map((player) => (
            <div
              key={player.userID}
              className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-2 shadow-sm"
            >
              <p className="text-lg font-medium truncate">{player.name}</p>
              <button
                onClick={() => kickPlayer(player.userID)}
                className="text-red-500 text-xl font-bold hover:text-red-700"
                aria-label={`Remove ${player.name}`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar with back button, start game button, and player count */}
      <div className="mt-24 flex justify-between items-center">
        <button
          onClick={closeGame}
          className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
        >
          ← BACK
        </button>
        
        <button
          onClick={startGame}
          disabled={playerCount < 2}
          className={`px-6 py-2 rounded text-white ${
            playerCount < 2
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          START GAME
        </button>

        {/* Debugging button to print socket ID */}
        <button onClick={() => console.log(socket.id)}>Print SocketID</button>

        <p className="text-sm font-medium text-right min-w-[120px]">
          PLAYERS: {playerCount}/8
        </p>
      </div>
    </div>
  );
};

export default HostLobby;
