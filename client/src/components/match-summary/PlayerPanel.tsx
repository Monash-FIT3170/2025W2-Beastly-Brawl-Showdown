import React from 'react';

// Define the player interface
interface PlayerData {
  playerState: {
    name: string;
    currentAttackStat?: number;
    // Add other player state properties as needed
  };
}

interface PlayerPanelProps {
  playerData: PlayerData;
  playerIndex: number;
  isBattleOver: boolean;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerData, playerIndex, isBattleOver }) => {
  return (
    <div 
      key={playerIndex}
      style={{
        backgroundColor: isBattleOver ? '#DAD9D7' : '#7EED55',
        borderRadius: '0.5rem',
        border: '2px solid #403245',
        padding: '0.5rem 1rem',
        textAlign: 'center',
        minWidth: '120px',
      }}
    >
      <div 
        style={{
          fontSize: '1rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#403245',
          marginBottom: '0.25rem',
        }}
      >
        {playerData.playerState.name}
      </div>
      <div 
        style={{
          fontSize: '0.875rem',
          fontFamily: 'Jua, sans-serif',
          color: '#403245',
        }}
      >
        HP: {playerData.playerState.currentAttackStat || 'N/A'}
      </div>
    </div>
  );
};

export default PlayerPanel;