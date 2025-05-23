import React from 'react';
import './styles.css';
import { MultipleBattleState } from '/types/composite/multipleBattleState';
import LogConentPanel from './LogContentPanel';

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
        {battleState?.map((battle, battleIndex) => {
            // Combine logs of all players in this battle
            const combinedLogs = battle.players
                ?.flatMap(player => player.playerState.logs) || [];
            console.log("combined logs = ", combinedLogs)
            return (
                <div key={battle.battleId ?? battleIndex} style={{ borderBottom: '2px solid black', paddingBottom: '1rem', marginBottom: '1rem' }}>
                <LogConentPanel logs={combinedLogs} />
                </div>
            );
            })}


      </div>
    </div>
  );
};

export default LogPanel;