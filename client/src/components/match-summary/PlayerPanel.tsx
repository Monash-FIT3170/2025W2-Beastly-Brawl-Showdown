import React from 'react';
import HealthBar from '../player-screen/HealthBar';
import { PlayerState } from '/types/single/playerState';

interface PlayerPanelProps {
  playerState: PlayerState;
  playerIndex: number;
  isLeftPlayer?: boolean; // Add this to control layout direction
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ 
  playerState, 
  playerIndex,  
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
        border: '2px solid #964B00',
        padding: '0.75rem 0.5rem',
        textAlign: 'center',
        minWidth: '200px',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        width: '50%'
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
          border: '2px solid'
        }}
      >
        {playerState.name}
      </div>
      
      {/* Health Bar and Monster Image Container */}
      <div 
        className='Healtbar-monsterimage-container'
        style={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: isLeftPlayer ? 'row' : 'row-reverse',
          position: 'relative', // Enable positioning for overlap
          border: '2px solid',
        }}
      >
        {/* Health Bar */}
        <div 
          style={{ 
            // flex: 1, 
            width: '80%',
            zIndex: 1, // Keep health bar below monster image
            border: '2px dotted',
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
            width: '70px',
            height: '70px',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'absolute',
            zIndex: 2,
            // For left player: position on the right side and shift left to overlap
            // For right player: position on the left side and shift right to overlap
            right: isLeftPlayer ? '10px' : 'auto', // Left player: 30px from right edge
            left: isLeftPlayer ? 'auto' : '10px',  // Right player: 30px from left edge
            top: '50%',
            transform: `translateY(-50%) ${isLeftPlayer ? 'scaleX(-1)' : 'scaleX(1)'}`,
            border: '2px solid',
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