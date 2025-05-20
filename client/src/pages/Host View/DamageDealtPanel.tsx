import React from 'react';
import './styles.css';

interface DamageData {
  playerName: string;
  damageAmount: number;
}

interface DamageDealtPanelProps {
  damageData?: DamageData[];
}

const DamageDealtPanel: React.FC<DamageDealtPanelProps> = ({ 
  damageData = [
    { playerName: 'CAMERON', damageAmount: 15 },
    { playerName: 'ANIKA', damageAmount: 12 },
    { playerName: 'DEVAN', damageAmount: 11 }
  ]
}) => {
  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1', // Peach/light yellow background
        borderRadius: '1.5rem', // Rounded corners
        border: '4px solid #403245', // Dark border
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Shadow for depth
        padding: '0.75rem 1.5rem',
        width: '260px',
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
        DAMAGE DEALT
      </h3>
      <div>
        {damageData.map((player, index) => (
          <div 
            key={index}
            style={{
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              margin: '0.5rem 0',
            }}
          >
            <span 
              style={{
                fontSize: '1.5rem',
                fontFamily: 'Jua, sans-serif',
                fontWeight: '100',
                color: '#FFFFFF', // White text
                WebkitTextStroke: '1px black', // Black outline
                textAlign: 'center',
                margin: '0 0 0.75rem 0',
                textTransform: 'uppercase'
              }}
            >
              {player.playerName}
            </span>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span 
                style={{
                  fontSize: '1.5rem',
                    fontFamily: 'Jua, sans-serif',
                    fontWeight: '100',
                    color: '#FFFFFF', // White text
                    WebkitTextStroke: '1px black', // Black outline
                    textAlign: 'center',
                    margin: '0 0 0.75rem 0',
                    textTransform: 'uppercase'
                }}
              >
                -
              </span>
              <span 
                style={{
                  fontSize: '1.5rem',
                    fontFamily: 'Jua, sans-serif',
                    fontWeight: '100',
                    color: '#FFFFFF', // White text
                    WebkitTextStroke: '1px black', // Black outline
                    textAlign: 'center',
                    margin: '0 0 0.75rem 0',
                    textTransform: 'uppercase'
                }}
              >
                {player.damageAmount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DamageDealtPanel;