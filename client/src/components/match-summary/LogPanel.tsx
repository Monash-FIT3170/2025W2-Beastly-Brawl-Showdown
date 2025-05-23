import React from 'react';
import './styles.css';
import { MultipleBattleState } from '/types/composite/multipleBattleState';

interface LogPanelProps {
  battleState?: MultipleBattleState|null;
}

const LogPanel: React.FC<LogPanelProps> = ({ battleState }) => {
  return (
    <div 
      style={{
        backgroundColor: '#FFE8B1', // Peach/light yellow background
        borderRadius: '1.5rem', // Rounded corners
        border: '4px solid #403245', // Dark border
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Shadow for depth
        padding: '0.75rem 1.5rem',
        width: '100%',
        margin: '1rem 0',
        height: '300px', // Fixed height with scrolling
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
          textDecoration: 'underline',
          textUnderlineOffset: '6px',
          textDecorationThickness: '3px',
        }}
      >
        GAME LOG
      </h3>
      
      {/* Scrollable log content */}
      <div 
        style={{
          height: 'calc(100% - 3rem)', // Account for header height
          overflowY: 'auto',
          paddingRight: '0.5rem',
        }}
      >
        {battleState?.players.map((player, index) => (
        <div key={index}>
            {player.logs.map((logEntry, i) => (
            
            <div 
                key={i}
                style={{
                fontSize: '0.875rem',
                fontFamily: 'Jua, sans-serif',
                fontWeight: '100',
                color: '#403245',
                margin: '0.25rem 0',
                padding: '0.25rem 0.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '0.25rem',
                borderLeft: '3px solid #403245',
                }}
            >
        {logEntry}
        console.log(player); 
      </div>
    ))}
  </div>
))}

      </div>
    </div>
  );
};

export default LogPanel;