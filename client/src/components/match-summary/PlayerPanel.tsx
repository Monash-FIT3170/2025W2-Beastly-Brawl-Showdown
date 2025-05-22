import React from 'react';
import HealthBar from '../player-screen/HealthBar';
import { Monster } from '/server/src/model/game/monster/monster';

// Define the player interface
interface PlayerData {
  playerState: {
        id: string;
        name: string;

        currentHealth: number;
        currentAttackStat: number;
        currentArmourClassStat: number;
        initialHealth: number;

        logs: string[];
  };
}

interface PlayerPanelProps {
  playerData: PlayerData;
  playerIndex: number;
  isBattleOver: boolean;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerData, playerIndex, isBattleOver }) => {
  // Extract current and max health values
  const currentHealth = playerData.playerState.currentHealth;
  const maxHealth = playerData.playerState.initialHealth;

  return (
    <div 
      key={playerIndex}
      style={{
        backgroundColor: isBattleOver ? '#DAD9D7' : '#7EED55',
        borderRadius: '0.5rem',
        border: '2px solid #403245',
        padding: '0.75rem 1rem', // Slightly more padding to accommodate health bar
        textAlign: 'center',
        minWidth: '140px', // Slightly wider for health bar
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {/* Player Name */}
      <div 
        style={{
          fontSize: '1rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#403245',
        }}
      >
        {playerData.playerState.name}
      </div>
      
      {/* Health Bar */}
      <div style={{ width: '100%' }}>
        <HealthBar 
          current={currentHealth} 
          max={maxHealth}
        />
      </div>
      
      {/* Optional: Show HP text below health bar for additional clarity */}
      <div 
        style={{
          fontSize: '0.75rem',
          fontFamily: 'Jua, sans-serif',
          color: '#403245',
          opacity: 0.8,
        }}
      >
        HP: {currentHealth}/{maxHealth}
      </div>
    </div>
  );
};

export default PlayerPanel;