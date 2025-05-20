import React, { useState } from 'react';
import Player from '../../types/player';
import Battle from '../../types/battle';

export const PlayerLobby = () => {
    const [playerCount, setPlayerCount] = useState(8);
    const [code, setCode] = useState(468923);
    const [players, setPlayers] = useState<Player[]>([
      new Player("0", "Player 1"), 
      new Player("1", "Player 2"), 
      new Player("2", "Player 3"),
      new Player("3", "Player 4"),
      new Player("4", "Player 5"),
      new Player("5", "Player 6"),
      new Player("6", "Player 7"),
      new Player("7", "Player 8")
    ]);
    // const [battles, setBattles] = useState<Battle[]>([
    //   new Battle(code,new Player("0", "Player 1"),new Player("1", "Player 2")),
    //   new Battle(code,new Player("2", "Player 3"),new Player("3", "Player 4")),
    //   new Battle(code,new Player("4", "Player 5"),new Player("5", "Player 6")),
    //   new Battle(code,new Player("6", "Player 7"),new Player("7", "Player 8"))
    // ]);

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
        <button onClick={startGame} disabled={playerCount < 2}>Start Game</button>
      </div>
    );
  };