import React from 'react';
import HealthBar from '../player-screen/HealthBar';
import { PlayerState } from '/types/single/playerState';

interface PlayerPanelProps {
  playerState: PlayerState;
  playerIndex: number;
  isLeftPlayer?: boolean; // Add this to control layout direction
  winner: boolean;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ 
  playerState, 
  playerIndex,  
  isLeftPlayer = true,
  winner
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
      {/* Player Name with Crown */}
      <div 
        style={{
          fontSize: '1rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#403245',
          marginBottom: '0.5rem',
          border: '2px solid',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
          position: 'relative',
        }}
      >
        {/* Crown image - only show if winner */}
        {winner && (
          <img 
            src="/match-summary-assets/CROWN.png"
            alt="Winner Crown"
            style={{
              width: '20px',
              height: '20px',
              objectFit: 'contain',
            }}
          />
        )}
        
        {/* Player Name */}
        <span>{playerState.name}</span>
        
        {/* Crown on the other side for balance (optional) */}
        {winner && (
          <img 
            src="/match-summary-assets/CROWN.png"
            alt="Winner Crown"
            style={{
              width: '20px',
              height: '20px',
              objectFit: 'contain',
            }}
          />
        )}
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
            right: isLeftPlayer ? '10px' : 'auto',
            left: isLeftPlayer ? 'auto' : '10px',
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