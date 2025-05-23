import React from 'react';
import './styles.css';

interface LogPanelProps {
  logs?: string[];
}

const LogPanel: React.FC<LogPanelProps> = ({ 
  logs = [
    "Game started with 8 players",
    "Round 1 battles initiated",
    "Player DANIEL attacked LUNA",
    "Player CAMERON blocked successfully",
    "Round 1 completed",
    "Round 2 battles initiated",
    "Player ANIKA dealt 5 damage",
    "Player RIO eliminated",
    "Current round: 2",
    "Battles in progress..."
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
        {logs.map((logEntry, index) => (
          <div 
            key={index}
            style={{
              fontSize: '0.875rem',
              fontFamily: 'Jua, sans-serif',
              fontWeight: '100',
              color: '#403245', // Dark text for readability
              margin: '0.25rem 0',
              padding: '0.25rem 0.5rem',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '0.25rem',
              borderLeft: '3px solid #403245',
            }}
          >
            {logEntry}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogPanel;