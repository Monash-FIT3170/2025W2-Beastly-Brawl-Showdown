import React from 'react';
import './styles.css';
import { MultipleBattleState } from '/types/composite/multipleBattleState';
import LogContentPanel from './LogContentPanel';
import { BattleState } from '/types/composite/battleState';

interface LogPanelProps {
  battleStates?: BattleState[]|null;
}

const LogPanel: React.FC<LogPanelProps> = ({ battleStates }) => {
    return (
    <div 
      style={{
        backgroundColor: '#FFE8B1', // Peach/light yellow background
        borderRadius: '1.5rem', // Rounded corners
        border: '4px solid #403245', // Dark border
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)', // Shadow for depth
        padding: '0.75rem 1.5rem',
        width: '260px',
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

        {battleStates?.map((battleState, index) => {
          const player1 = battleState.yourPlayer;
          const player2 = battleState.opponentPlayer;
          const logPlayer1 = player1.battleLogs;
          const logPlayer2 = player2.battleLogs;
          const combinedLogs = [...logPlayer1, ...logPlayer2];
          
          return (
            <div 
              key={index}
              style={{
                borderBottom: index < battleStates.length - 1 ? '2px solid #403245' : 'none', // Use your theme color
                paddingBottom: '0.75rem',
                marginBottom: '0.75rem',
              }}
            >
              <LogContentPanel 
                logs={combinedLogs} 
              />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default LogPanel;