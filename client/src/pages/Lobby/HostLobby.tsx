import React, { useState } from 'react';
import Player from '../../types/player' 
import { LogoDisplay } from "../../components/logo/Logo";
import {QRCodeSVG} from 'qrcode.react';

export const HostLobby = () => {
    const [playerCount, setPlayerCount] = useState(6);
    const [code, setCode] = useState(468923);
    const [players, setPlayers] = useState<Player[]>([
      new Player("0", "Naveen"), 
      new Player("1", "Anika"), 
      new Player("2", "Daniel"),
      new Player("3", "Derek"), 
      new Player("4", "Luna"), 
      new Player("5", "Cameron")
    ]);

    const addPlayer = (playerName: string, playerID: string) => {
      setPlayers(players.concat(new Player(playerID, playerName)))
      setPlayerCount(playerCount + 1);
    }

    const removePlayer = (playerID: string) => {
      setPlayers(players.filter((Player) => Player.userID !== playerID));
      setPlayerCount(playerCount - 1);
    };

    const enterCode = (newCode: number) => {
      setCode(newCode)
    }

    const kickPlayer = (playerID: string) => {
      removePlayer(playerID)
      // backend player removal call
    };

    const startGame = () => {
 
    }
  
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
          Join The Game! <br className="sm:hidden" />
          {`${window.location.origin}/${code}`}
        </h2>
      </div>

      {/* QR code on the right */}
      <div className="flex-shrink-0">
        <QRCodeSVG
          value={`${window.location.origin}/${code}`}
          size={200} // smaller on mobile
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


      <div className="mt-24 flex justify-between items-center">
      {/* Back Button - Bottom Left */}
      <button
        onClick={() => {}} // replace with your actual handler
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        ← Back
      </button>

      {/* Center Spacer to keep Start Game in the middle if needed */}
      {/* You can remove this if you don't need Start Game centered */}
      <div className="flex-1 text-center">
        <button
          onClick={startGame}
          disabled={playerCount < 2}
          className={`px-6 py-2 rounded text-white ${
            playerCount < 2 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Start Game
        </button>
      </div>

      {/* Player Count - Bottom Right */}
      <p className="text-sm font-medium text-right min-w-[120px]">
        PLAYERS: {playerCount}/8
      </p>
    </div>
    </div>
  </div>
);
  }