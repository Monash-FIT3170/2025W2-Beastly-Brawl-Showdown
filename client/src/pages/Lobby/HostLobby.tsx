import React, { useState } from "react";
import Player from "../../types/player";
import io from "socket.io-client";
// import React, { useRef } from "react";

export const HostLobby = () => {
    const [playerCount, setPlayerCount] = useState(3);
    const [code, setCode] = useState(468923);
    const [players, setPlayers] = useState<Player[]>([
      new Player("0", "Player 1"), 
      new Player("1", "Player 2"), 
      new Player("2", "Player 3"),
      new Player("3", "Player 4"),
      new Player("4", "Player 5")
    ]);
  const [playerCount, setPlayerCount] = useState(3);
  const [code, setCode] = useState(468923);
  const [players, setPlayers] = useState<Player[]>([
    new Player("0", "Player 1"),
    new Player("1", "Player 2"),
    new Player("2", "Player 3"),
  ]);

  const addPlayer = (playerName: string, playerID: string) => {
    setPlayers(players.concat(new Player(playerID, playerName)));
    setPlayerCount(playerCount + 1);
  };

  const removePlayer = (playerID: string) => {
    setPlayers(players.filter((Player) => Player.userID !== playerID));
    setPlayerCount(playerCount - 1);
  };

  const enterCode = (newCode: number) => {
    setCode(newCode);
  };

  const kickPlayer = (playerID: string) => {
    removePlayer(playerID);
    // backend player removal call
  };

    const startGame = () => {
 
    }
  
    return (
      <div>
        <h1>Beastly Brawl Showdown</h1>
        <h2>LOBBY</h2>
        <p>Hosting at address at: {window.location.origin}</p>
        <p>Join the game with: {code}</p>
        <p>Currently there are {playerCount}/8 players in the lobby.</p>
        {players.map((player) => (
          <div key={player.userID}>
            <p>{player.name}</p> 
            <button onClick={() => kickPlayer(player.userID)}>Remove</button>
          </div>
        ))}
        <button onClick={startGame} disabled={playerCount < 2}>Start Game</button>
      </div>
    );
  };
  const startGame = () => {};

  //socket setup testing - anika

  const socket = io("http://localhost:3002");
  const createGame = () => {
    socket.emit("create-game", {});
  };

  const listSessions = () => {
    socket.emit("game-list", {});
  };

  const [codeV, setCodeV] = useState("");
  const [nameV, setNameV] = useState("");

  const joinSession = () => {
    const codeX = "815948";
    console.log(codeV);
    const codeTest = document.getElementById("code") as HTMLParagraphElement;
    codeTest.textContent = codeV + nameV;
    socket.emit("join-game", { gameCode: codeV, name: nameV });
  };

  return (
    <div>
      <p>Beastly Brawl</p>
      <p>Hosting at address at: {window.location.origin}</p>
      <p>Join the game with: {code}</p>
      <p>Currently there are {playerCount}/8 players in the lobby.</p>
      {players.map((player) => (
        <div key={player.userID}>
          <p>{player.name}</p>
          <button onClick={() => kickPlayer(player.userID)}>Remove</button>
        </div>
      ))}
      <button onClick={startGame} disabled={playerCount < 2}>
        Start Game
      </button>
      <p></p>
      <p>SOCKET SETUP TESTING BELOW:</p>
      <button onClick={createGame}>Create New Session</button>
      <p></p>
      <button onClick={listSessions}>Current Sessions</button>
      <p>Code:</p>
      <input
        type="text"
        id="codeInput"
        value={codeV}
        onChange={(e) => setCodeV(e.target.value)}
      />
      <p>Name:</p>
      <input
        type="text"
        id="nameInput"
        value={nameV}
        onChange={(e) => setNameV(e.target.value)}
      />
      <p></p>
      <button onClick={joinSession}>Join Created Session</button>
      <p id="code"></p>
    </div>
  );
};
