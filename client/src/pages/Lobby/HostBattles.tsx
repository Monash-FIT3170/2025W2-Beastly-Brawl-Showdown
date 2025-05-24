import React, { useState, useEffect } from "react";
// Update the import path and extension as needed; for example:
import { BattleState } from "/types/composite/battleState";
import { LogoDisplay } from "../../components/logo/Logo";
import socket from "../../socket";
import { MostChosenMonsterState } from "/types/single/mostChosenMonsterState";
import RoundNumberHeader from "../../components/match-summary/RoundNumberHeader";
import LeftPanel from "../../components/match-summary/LeftPanel";
import RightPanel from "../../components/match-summary/RightPanel";
import MiddlePanel from "../../components/match-summary/MiddlePanel";
import { GameSessionState } from "/types/composite/gameSessionState";

import { PlayerStats } from "../../types/data";

interface HostBattlesProps {
  gameCode?: string;
}

const HostBattles: React.FC<HostBattlesProps> = ({ gameCode }) => {
  const code = gameCode; // Currently unused, used for potential page changes
  const [gameSession, setGameSession] = useState<GameSessionState>();
  // const [mostChosenMonster, setMostChosenMonster] = useState<MostChosenMonsterState | null>(null);
  const [playerStats, setPlayerStats] = useState<PlayerStats>();
  
  // Function to extract player statistics from battleStates
  const extractPlayerStatistics = (battles: BattleState[] | null) => {
    if (!battles) return { blockData: [], damageData: [] };
    
    const blockDataMap: Record<string, number> = {};
    const damageDataMap: Record<string, number> = {};
    
    // Loop through all battles and collect player statistics
    battles.forEach(battle => {
      
        const playerState = battle.yourPlayer;
        const playerName = playerState.name;
        const successBlocks = playerState.successBlock || 0; // Use successBlock from player state
        const successHits = playerState.successHit || 0; // Use successHit from player state

        // console.log(playerState.logs)
        
        // Accumulate blocks for each player across all battles
        blockDataMap[playerName] = (blockDataMap[playerName] || 0) + successBlocks;
        
        // Accumulate damage for each player across all battles (each hit = 5 damage)
        damageDataMap[playerName] = (damageDataMap[playerName] || 0) + (successHits * 5);

        const secondPlayerState = battle.opponentPlayer;
        const secondPlayerName = secondPlayerState.name;
        const secondPlayersuccessBlocks = secondPlayerState.successBlock || 0; // Use successBlock from player state
        const secondPlayeruccessHits = secondPlayerState.successHit || 0; // Use successHit from player state

        // console.log(playerState.logs)
        
        // Accumulate blocks for each player across all battles
        blockDataMap[secondPlayerName] = (blockDataMap[secondPlayerName] || 0) + secondPlayersuccessBlocks;
        
        // Accumulate damage for each player across all battles (each hit = 5 damage)
        damageDataMap[secondPlayerName] = (damageDataMap[secondPlayerName] || 0) + (secondPlayeruccessHits * 5);
      
    });
    // Convert block data to array format and sort by blocks (highest first)
        const blockData = Object.entries(blockDataMap)
          .map(([playerName, blocksAmount]) => ({ playerName, blocksAmount }))
          .sort((a, b) => b.blocksAmount - a.blocksAmount);
        
        // Convert damage data to array format and sort by damage (highest first)
        const damageData = Object.entries(damageDataMap)
          .map(([playerName, damageAmount]) => ({ playerName, damageAmount }))
          .sort((a, b) => b.damageAmount - a.damageAmount);
        
        return { blockData, damageData };
    }

  useEffect(() => {
    {/*Listens for the "host_battle_summary" message from the server via Socket.IO.
    When that message arrives, it receives battles (an array or object of match data).
    Then it updates the React state using setBattleStates(battles).
    This lets you:
    Store live data from the server
    Trigger a re-render with the new data if needed */}

    // socket.on("most_chosen_monster", (monster: MostChosenMonsterState) => {
    //   console.log('Received most chosen monster:', monster);
    //   setMostChosenMonster(monster);
    // });

    socket.on("game-session-state", ({ session}) => {
      console.log('sessionData:',session)
      setGameSession(session);
    });
    
    return () => {
      {/* This is the cleanup function that React will call when the component unmounts.
          socket.off("host_battle_summary") removes the listener, so you do not get memory leaks or duplicate event handlers. */}
      // socket.off("most_chosen_monster");
      socket.off("game-session-state");
    };
  }, []);

  useEffect(() => {
  if (gameSession) {
    setPlayerStats(extractPlayerStatistics(gameSession.battleStates));
  }
}, [gameSession]); // Only run when gameSession changes


  return (
    <div 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        padding: '1rem',
        margin: '0', // no margin because we'll control spacing by inset
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        bottom: '1rem',
        overflow: 'auto',
      }}
    >   
    {gameSession && playerStats? (
      <div>
        <RoundNumberHeader roundNumber={gameSession.round} />
        {/* Main content area with grid layout */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto', // Left panel, Middle panel, Right panel. auto means take up as much space as you need and 1fr means take up the rest of the remaining space
            gap: '1rem',
            marginTop: '1rem',
            height: 'calc(100% - 8rem)', // Adjust based on header height
            border: '2px solid #403245',
            position: 'relative'
          }}
        >
          {/* Left Panel */}
          {/* <div className="left-panel"> */}
            <LeftPanel 
              damageData={playerStats.damageData} // Use real damage data
              blockData={playerStats.blockData} // Use real block data
              popularMonster={gameSession.gameSessionData.mostChosenMonster}
            />
          {/* </div> */}

          {/* Middle Panel */}
          <div style={{ height: '100%', overflow: 'auto'  }}>
            <MiddlePanel gameSession={gameSession} />
          </div>

          {/* Right Panel */}
          <div style={{ minWidth: '260px', height: '100%', overflow: 'auto' }}>
            <RightPanel battleStates={gameSession.battleStates}/>
          </div>
        </div>
      </div>
    ) : null}

    

    </div>
  );
};

export default HostBattles;
