import React, { useState, useEffect } from "react";
import Player from "../../types/player";
// import io from "socket.io-client";
// import React, { useRef } from "react";
import { LogoDisplay } from "../../components/logo/Logo";
import { QRCodeSVG } from "qrcode.react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";

const HostLobby: React.FC = () => {
  const [code, setCode] = useState(101010); //placeholder
  const [players, setPlayers] = useState<Player[]>([]);
  const [playerCount, setPlayerCount] = useState(0);
  const [hostIP, setHostIP] = useState("");

  //GETTING HOST IP:
  // Effect to fetch and log the host's IP address
  useEffect(() => {
    const getHostIP = async () => {
      try {
        // Using a public API to get the client's IP address
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        setHostIP(data.ip);
        console.log("Host IP for testing:", data.ip);
      } catch (error) {
        console.error("Error fetching host IP:", error);
      }
    };

    getHostIP();
  }, []);

  //BUTTON FUNCTIONS:

  //kick
  const kickPlayer = (playerID: string) => {
    // backend player removal call
    socket.emit("leave-game", { gameCode: code, userID: playerID });
  };

  const startGame = () => {
    socket.emit("start-game", { gameCode: codeV });
  };

  const closeGame = () => {
    //popup asking if they are sure
    //insert!!!
    //close game session
    socket.emit("cancel-game", { gameCode: code });
    //return to home
    FlowRouter.go("/");
  };

  //LISTENERS:
  socket.on("new-game", ({ code }) => {
    console.log(code);
    setCode(code);
  });

  socket.on("player-join", ({ message, players }) => {
    console.log(message);

    //update page contents according to session?
    console.log("players from server:", players);
    if (Array.isArray(players)) {
      setPlayers(players);
      setPlayerCount(players.length);
    } else {
      console.error("Players is not an array!", players);
    }
  });

  socket.on("player-leave", ({ message, players }) => {
    console.log(message);

    //update page contents according to session?
    console.log("players from server:", players);
    if (Array.isArray(players)) {
      setPlayers(players);
      setPlayerCount(players.length);
    } else {
      console.error("Players is not an array!", players);
    }
  });

  //SOCKET SETUP TESTING
  const createGame = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  const listSessions = () => {
    socket.emit("game-list", {});
    console.log("Game session list requested");
  };

  const [codeV, setCodeV] = useState("");
  const [nameV, setNameV] = useState("");

  const joinSession = () => {
    // const codeTest = document.getElementById("code") as HTMLParagraphElement;
    socket.emit("join-game", { gameCode: codeV, name: nameV });
  };

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
            {`${window.location.origin}/${code}`}
          </h2>
          {hostIP && (
            <p className="text-sm text-gray-500 mt-1">
              Host IP (for testing): {hostIP}
            </p>
          )}
        </div>

        {/* QR code on the right */}
        <div className="flex-shrink-0">
          <QRCodeSVG
            value={`${window.location.origin}/${code}`}
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
      <div className="mt-12 flex justify-between items-center">
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

        <p className="text-sm font-medium text-right min-w-[120px]">
          PLAYERS: {playerCount}/8
        </p>
      </div>
      <p className="mt-8 text-lg font-semibold">SOCKET SETUP TESTING BELOW:</p>
      <div className="mt-4 space-y-4">
        <button
          onClick={createGame}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create New Session
        </button>

        <button
          onClick={listSessions}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Current Sessions
        </button>

        <div>
          <label
            htmlFor="codeInput"
            className="block text-sm font-medium text-gray-700"
          >
            Code:
          </label>
          <input
            type="text"
            id="codeInput"
            value={codeV}
            onChange={(e) => setCodeV(e.target.value)}
            className="mt-1 w-full max-w-xs rounded border-2 border-green-500 shadow-sm focus:ring-green-500 focus:border-green-600"
          />
        </div>

        <div>
          <label
            htmlFor="nameInput"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="nameInput"
            value={nameV}
            onChange={(e) => setNameV(e.target.value)}
            className="mt-1 w-full max-w-xs rounded border-2 border-green-500 shadow-sm focus:ring-green-500 focus:border-green-600"
          />
        </div>

        <button
          onClick={joinSession}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Join Created Session
        </button>

        <p id="code" className="text-sm text-gray-600 mt-2"></p>
      </div>
    </div>
  );
};

export default HostLobby;
