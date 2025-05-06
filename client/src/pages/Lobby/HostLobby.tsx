import React, { useState } from 'react';

export const HostLobby = () => {
    const [playerCount, setPlayerCount] = useState(3);
    const [code, setCode] = useState(468923);
    const [players, setPlayers] = useState<string[]>(['Player 1', 'Player 2', 'Player 3']);

    const addPlayer = (name: string) => {
      setPlayers(players.concat(name))
      setPlayerCount(playerCount + 1);
    }

    const removePlayer = (name: string) => {
      setPlayers(players.filter(searchedName => searchedName !== name));
      setPlayerCount(playerCount - 1);
    };

    const enterCode = ( newCode: number) => {
      setCode(newCode)
    }

    const startGame = () => {
 
    }
  
    return (
      <div>
        <p>Beastly Brawl</p>
        <p>Join the game at: {code}</p>
        <p>Currently there are {playerCount}/8 players in the lobby.</p>
        {players.map((name, index) => (
          <div key={index} className="card">
            <p>{name}</p>
            <button onClick={() => removePlayer(name)}>Remove</button>
          </div>
        ))}
        <button onClick={startGame} disabled={playerCount < 2}>Start Game</button>
      </div>
    );
  };