import React from 'react';
import HealthBar from '../player-screen/HealthBar';
import { PlayerState } from '/types/single/playerState';

interface PlayerPanelProps {
  playerState: PlayerState;
  playerIndex: number;
  isBattleOver: boolean;
  isLeftPlayer?: boolean; // Add this to control layout direction
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ 
  playerState, 
  playerIndex, 
  isBattleOver, 
  isLeftPlayer = true 
}) => {
  // Extract current and max health values
  const currentHealth = playerState.currentHealth;
  const maxHealth = playerState.initialHealth;

  // Format the name of the monster from the form 'Monster Name' to 'MONSTER_NAME'.
  const formattedName = playerState.monsterName.toUpperCase().replace(/ /g, "_");
  const imageSrc = `/assets/characters/${formattedName}.png`;

  return (
    <div 
      key={playerIndex}
      style={{
        borderRadius: '0.5rem',
        padding: '0.75rem 1rem',
        textAlign: 'center',
        minWidth: '200px',
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
          marginBottom: '0.5rem',
        }}
      >
        {playerState.name}
      </div>
      
      {/* Health Bar and Monster Image Container */}
      <div 
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          flexDirection: isLeftPlayer ? 'row' : 'row-reverse', // Left player: health-monster, Right player: monster-health
        }}
      >
        {/* Health Bar */}
        <div style={{ flex: 1, minWidth: '120px' }}>
          <HealthBar 
            current={currentHealth} 
            max={maxHealth}
          />
        </div>
        
        {/* Monster Image */}
        <div 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            flexShrink: 0, // Prevent image from shrinking
          }}
        >
          <img 
            src={imageSrc}
            alt={`${playerState.name}'s monster`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;