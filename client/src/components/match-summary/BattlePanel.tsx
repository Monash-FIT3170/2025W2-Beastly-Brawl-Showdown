import React from 'react';
import PlayerPanel from './PlayerPanel';
import { PlayerState } from '/types/single/playerState';

// Define the battle interface based on your MultipleBattleState structure
interface BattleData {
  battleId: string;
  turn: number;
  players: Array<{
    playerState: PlayerState;
  }>;
  isOver: boolean;
}

interface BattlePanelProps {
  battle: BattleData;
  battleIndex: number;
}

const BattlePanel: React.FC<BattlePanelProps> = ({ battle, battleIndex }) => {
  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1',
        borderRadius: '0.75rem',
        border: '2px solid #403245',
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <h3 
        style={{
          fontSize: '1.25rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#403245',
          margin: '0 0 0.75rem 0',
          textAlign: 'center',
        }}
      >
        Battle {battleIndex + 1} - Turn {battle.turn}
      </h3>
      
      {/* Display players in this battle */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
          position: 'relative',
          gap: '1rem', // Add gap between players
        }}
      >
        {battle.players.map((playerData, playerIndex) => (
          <PlayerPanel
            key={playerIndex}
            playerState={playerData.playerState}
            playerIndex={playerIndex}
            isBattleOver={battle.isOver}
            isLeftPlayer={playerIndex === 0} // First player is left, second is right
          />
        ))}
        
      </div>
      
      {/* Battle status
      <div 
        style={{
          textAlign: 'center',
          fontSize: '0.875rem',
          fontFamily: 'Jua, sans-serif',
          color: '#403245',
          fontStyle: 'italic',
        }}
      >
        {battle.isOver ? 'Battle Complete' : 'Battle In Progress'}
      </div> */}
      
    </div>
  );
};

export default BattlePanel;