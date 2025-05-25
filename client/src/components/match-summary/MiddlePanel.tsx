import React from 'react';
import BattlePanel from './BattlePanel';
import { GameSessionState } from '/types/composite/gameSessionState';

interface MiddlePanelProps {
  gameSession?: GameSessionState | null;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ gameSession }) => {
  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        border: '2px solid',
        position: 'relative',
        color: '#403245',

      }}
    >
      <h2 
        style={{
          fontSize: '2rem',
          fontFamily: 'Jua, sans-serif',
          fontWeight: 'bold',
          color: '#FFFFFF',
          textAlign: 'left',
          margin: '0 0 1rem 0',
          textTransform: 'uppercase',
          WebkitTextStroke: '0.1px black',  // Add this
          textShadow: 'none',   
          padding: '0.5rem'     // Add this
        }}
      >
        {'Remaining: ' + gameSession?.remainingPlayers+ '/' + gameSession?.totalPlayers}
      </h2>
      
      {/* Display battle states data */}
      {gameSession.battleStates && (
        
        <div className='all-battle-panels-holder'
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr', // Two equal columns
            gap: '1rem', // Space between battles
            alignItems: 'start', // Align battles to the top of their grid cells
            width: '100%',
            border: '2px solid'
          }}
        >
          {gameSession.battleStates.map((battleState, index) => (
            <div className='individual-battle-panel-holder'
              key={battleState.id || index}
              style={{
                border: '2px dotted #006400',
                padding: '0.5rem',
                // position: 'absolute',
                width: '100%'
              }}
            >
              <BattlePanel 
                battleState={battleState}       // This is passed as a prop
                battleIndex={index} 
                currentPhase={gameSession.currentPhase}            // This is passed as a prop. Represents the battle number
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MiddlePanel;