import React from 'react';
import RoundNumberHeader from './RoundNumberHeader';
import LeftPanel from './LeftPanel';
import MiddlePanel from './MiddlePanel';
import { MultipleBattleState } from '../../../../types/composite/multipleBattleState';
import { useState, useEffect } from 'react';
import socket from '../../socket';
import { MostChosenMonsterState } from '../../../../types/single/mostChosenMonsterState';

interface MatchSummaryPanelProps {
  // Round information
  roundNumber?: number;
  remainingPlayers?: number;
  totalPlayers?: number;
}
// This component listens for a message called host_battle_summary from the server. Then it stores the received data in a react state variable (battleStates)
const MatchSummaryPanel: React.FC<MatchSummaryPanelProps> = ({ }) => {
  // Declares a piece of React state called battleStates.
  // Starts off as null.
  // When data comes in from the server, you call setBattleStates(...) to store it.
  {/*
    useState is a React Hook that lets your component:
    store data that can change over time
    automatically re-render when that data changes
    This stored data is called state.
    */}
  const [battleStates, setBattleStates] = useState<MultipleBattleState | null>(null);
  const [mostChosenMonster, setMostChosenMonster] = useState<MostChosenMonsterState | null>(null);

  // Function to extract player statistics from battleStates
  const extractPlayerStatistics = (battles: MultipleBattleState | null) => {
    if (!battles) return { blockData: [], damageData: [] };
    
    const blockDataMap: Record<string, number> = {};
    const damageDataMap: Record<string, number> = {};
    
    // Loop through all battles and collect player statistics
    battles.forEach(battle => {
      battle.players.forEach(playerData => {
        const playerState = playerData.playerState;
        const playerName = playerState.name;
        const successBlocks = playerState.successBlock || 0; // Use successBlock from player state
        const successHits = playerState.successHit || 0; // Use successHit from player state
        
        // Accumulate blocks for each player across all battles
        blockDataMap[playerName] = (blockDataMap[playerName] || 0) + successBlocks;
        
        // Accumulate damage for each player across all battles (each hit = 5 damage)
        damageDataMap[playerName] = (damageDataMap[playerName] || 0) + (successHits * 5);
      });
    });
    
    // Convert block data to array format and sort by blocks (highest first)
    const blockData = Object.entries(blockDataMap)
      .map(([playerName, blocksAmount]) => ({ playerName, blocksAmount }))
      .filter(player => player.blocksAmount > 0) // Only show players with blocks
      .sort((a, b) => b.blocksAmount - a.blocksAmount);
    
    // Convert damage data to array format and sort by damage (highest first)
    const damageData = Object.entries(damageDataMap)
      .map(([playerName, damageAmount]) => ({ playerName, damageAmount }))
      .filter(player => player.damageAmount > 0) // Only show players with hits
      .sort((a, b) => b.damageAmount - a.damageAmount);
    
    return { blockData, damageData };
  };

  useEffect(() => {
    {/*Listens for the "host_battle_summary" message from the server via Socket.IO.
    When that message arrives, it receives battles (an array or object of match data).
    Then it updates the React state using setBattleStates(battles).
    This lets you:
    Store live data from the server
    Trigger a re-render with the new data if needed */}
    socket.on("host_battle_summary", (battles: MultipleBattleState) => {
      setBattleStates(battles);
      console.log(battles)
    });

    socket.on("most_chosen_monster", (monster: MostChosenMonsterState) => {
      console.log('Received most chosen monster:', monster);
      setMostChosenMonster(monster);
    });
    
    return () => {
      {/* This is the cleanup function that React will call when the component unmounts.
          socket.off("host_battle_summary") removes the listener, so you do not get memory leaks or duplicate event handlers. */}
      socket.off("host_battle_summary");
      socket.off("most_chosen_monster");
    };
  }, []);

  // Extract real player statistics from battleStates
  const playerStats = extractPlayerStatistics(battleStates);

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

    <RoundNumberHeader roundNumber={battleStates?.[0]?.turn ?? ''} />

    {/* Main content area with grid layout */}
    <div 
      style={{
        display: 'grid',
        gridTemplateColumns: '320px 1fr',
        gap: '1rem',
        marginTop: '1rem',
        height: 'calc(100% - 8rem)', // Adjust based on header height
      }}
    >
      {/* Left Panel */}
      <div>
        {/* <pre>{battleStates?.[0]?.players?.[0]?.playerState?.name}</pre> */}
        {/* <pre>{JSON.stringify(battleStates, null, 2)}</pre> */}

        <LeftPanel 
          damageData={playerStats.damageData} // Use real damage data
          blockData={playerStats.blockData} // Use real block data
          popularMonster={mostChosenMonster ?? undefined}
        />
      </div>

      {/* Middle Panel */}
      <div>
        <MiddlePanel battleStates={battleStates} />
      </div>
    </div>

    </div>
  );
};

export default MatchSummaryPanel;