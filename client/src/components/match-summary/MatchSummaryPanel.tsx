import React from 'react';
import RoundNumberHeader from './RoundNumberHeader';
import LeftPanel from './LeftPanel';
import { MultipleBattleState } from '../../../../types/composite/multipleBattleState';
import { useState, useEffect } from 'react';
import socket from '../../socket';
import { MostChosenMonsterState } from '../../../../types/single/mostChosenMonsterState';

interface MatchSummaryPanelProps {
  // Round information
  roundNumber?: number;
  remainingPlayers?: number;
  totalPlayers?: number;
  
  // Left panel data
  damageData?: Array<{ playerName: string; damageAmount: number }>;
  blockData?: Array<{ playerName: string; blocksAmount: number }>;
}
// This component listens for a message called host_battle_summary from the server. Then it stores the received data in a react state variable (battleStates)
const MatchSummaryPanel: React.FC<MatchSummaryPanelProps> = ({ 

       // Left panel data with defaults
      damageData = [
        { playerName: 'CAMERON', damageAmount: 15 },
        { playerName: 'ANIKA', damageAmount: 12 },
        { playerName: 'DEVAN', damageAmount: 11 }
      ],
      blockData = [
        { playerName: 'DANIEL', blocksAmount: 3 },
        { playerName: 'LUNA', blocksAmount: 2 },
        { playerName: 'RIO', blocksAmount: 1 }
      ]
 }) => {
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
  useEffect(() => {
    {/*Listens for the "host_battle_summary" message from the server via Socket.IO.
    When that message arrives, it receives battles (an array or object of match data).
    Then it updates the React state using setBattleStates(battles).
    This lets you:
    Store live data from the server
    Trigger a re-render with the new data if needed */}
    socket.on("host_battle_summary", (battles: MultipleBattleState) => {
      setBattleStates(battles);
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


    {/* Only the Left Panel */}
      <div style={{ maxWidth: '320px', width: '100%', marginTop: '1rem' }}>
        {/* <h3>{mostChosenMonster}</h3> */}
        <h3>battleStates</h3>
        {/* <pre>{battleStates?.[0]?.players?.[0]?.playerState?.name}</pre> */}
        {/* <pre>{JSON.stringify(battleStates, null, 2)}</pre> */}

        <LeftPanel 
          damageData={damageData}
          blockData={blockData}
          popularMonster={mostChosenMonster ?? undefined}
        />
      </div>

    </div>
  );
};


export default MatchSummaryPanel;