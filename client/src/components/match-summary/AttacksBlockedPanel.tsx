import React from 'react';
import './styles.css';

interface BlockData {
  playerName: string;
  blocksAmount: number;
}

interface AttacksBlockedPanelProps {
  blockData?: BlockData[];
}

const AttacksBlockedPanel: React.FC<AttacksBlockedPanelProps> = ({ blockData }) => {
  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1', // Peach/light yellow background
        borderRadius: '1.5rem', // Rounded corners
        border: '4px solid #403245', // Dark border
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Shadow for depth
        padding: '0.75rem 1.5rem',
        width: '260px',
        margin: '1rem auto',  // Example: 1rem top & bottom, centered horizontally
      }}
    >
      <h3 
        style={{
          fontSize: '1.5rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: '100',
          color: '#FFFFFF', // White text
          WebkitTextStroke: '1px black', // Black outline
          textAlign: 'center',
          margin: '0 0 0.75rem 0',
          textTransform: 'uppercase',
          textDecoration: 'underline', // Underline as in the image
          textUnderlineOffset: '6px',
          textDecorationThickness: '3px', // <-- Thicker underline
        }}
      >
        ATTACKS BLOCKED
      </h3>
      <div>
        {blockData.map((player, index) => (
          <div 
            key={index}
            style={{
              display: 'flex', 
              alignItems: 'center',
              margin: '0.25rem 0', // Reduced from 0.5rem to 0.25rem
              gap: '1rem', // Add consistent gap between all elements
            }}
          >
            <span 
              style={{
                fontSize: '1.5rem',
                fontFamily: 'Jua, sans-serif',
                fontWeight: '100',
                color: '#000000', // White text
                textTransform: 'uppercase',
                flex: '1',
                textAlign: 'center', // Center the player name in its flex area
              }}
            >
              {player.playerName}
            </span>
            <span 
              style={{
                fontSize: '1.5rem',
                fontFamily: 'Jua, sans-serif',
                fontWeight: '100',
                color: '#000000', // White text
                textTransform: 'uppercase',
                flex: '0 0 auto',
                textAlign: 'center',
                minWidth: '20px',
              }}
            >
              -
            </span>
            <span 
              style={{
                fontSize: '1.5rem',
                fontFamily: 'Jua, sans-serif',
                fontWeight: '100',
                color: '#000000', // White text
                textTransform: 'uppercase',
                flex: '1',
                textAlign: 'center', // Center the blocks amount in its flex area
              }}
            >
              {player.blocksAmount}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttacksBlockedPanel;