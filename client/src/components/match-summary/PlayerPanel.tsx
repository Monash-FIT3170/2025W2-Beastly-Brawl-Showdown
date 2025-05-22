import React from 'react';
import HealthBar from '../player-screen/HealthBar';
import { PlayerState } from '/types/single/playerState';


interface PlayerPanelProps {
  playerState: PlayerState;
  playerIndex: number;
  isBattleOver: boolean;
}

const PlayerPanel: React.FC<PlayerPanelProps> = ({ playerState, playerIndex, isBattleOver }) => {
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
        // backgroundColor: isBattleOver ? '#DAD9D7' : '#7EED55',
        borderRadius: '0.5rem',
        // border: '2px solid #403245',
        padding: '0.75rem 1rem', // Slightly more padding to accommodate health bar
        textAlign: 'center',
        minWidth: '200px', // Slightly wider for health bar
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
        {playerState.name}
      </div>
      
      {/* Health Bar */}
      <div style={{ width: '100%' }}>
        <HealthBar 
          current={currentHealth} 
          max={maxHealth}
        />
                {/* Monster Image */}
        <div 
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '0.5rem',
            // border: '2px solid #403245',
            // backgroundColor: '#F6F1E5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
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