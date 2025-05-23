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
        border: '2px solid #403245',
        padding: '0.75rem 0.5rem',
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
          flexDirection: isLeftPlayer ? 'row' : 'row-reverse',
          position: 'relative', // Enable positioning for overlap
        }}
      >
        {/* Health Bar */}
        <div 
          style={{ 
            flex: 1, 
            minWidth: '120px',
            zIndex: 1, // Keep health bar below monster image
            transform: isLeftPlayer ? 'scale(1, 1)' : 'scale(1, 1)', // Flip health bar for right player
          }}
        >
          <HealthBar 
            current={currentHealth} 
            max={maxHealth}
            isLeftPlayer={isLeftPlayer}
          />
        </div>
        
        {/* Monster Image */}
        <div 
          style={{
            width: '70px', // Slightly larger to make overlap more visible
            height: '70px',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
            zIndex: 2, // Keep monster image above health bar
            marginLeft: isLeftPlayer ? '-30px' : '0px', // Overlap from right for left player
            marginRight: isLeftPlayer ? '0px' : '-30px', // Overlap from left for right player
          }}
        >
          <img 
            src={imageSrc}
            alt={`${playerState.name}'s monster`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: isLeftPlayer ? 'scaleX(-1)' : 'scaleX(1)', // Flip horizontally for left player
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PlayerPanel;