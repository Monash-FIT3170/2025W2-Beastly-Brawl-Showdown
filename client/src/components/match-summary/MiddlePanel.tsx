import React from 'react';
import BattlePanel from './BattlePanel';
import { GameSessionState } from '/types/composite/gameSessionState';
import { OutlineText } from '../texts/OutlineText';
import { GameModeIdentifier } from '/types/single/gameMode';

interface MiddlePanelProps {
  gameSession: GameSessionState;
  gameMode: GameModeIdentifier;
}

const MiddlePanel: React.FC<MiddlePanelProps> = ({ gameSession, gameMode }) => {
  
  return (
    <div 
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
        // border: '2px solid',
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
        {'Remaining: ' + gameSession.remainingPlayers+ '/' + gameSession.totalPlayers}
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
            // border: '2px solid'
          }}
        >
          {gameSession.battleStates.map((battleState, index) => (
            <div className='individual-battle-panel-holder'
              key={battleState.id || index}
              style={{
                // border: '2px dotted #006400',
                padding: '0rem',
              }}
            >
              <BattlePanel 
                battleState={battleState}       // This is passed as a prop
                battleIndex={index} 
                currentPhase={gameSession.currentPhase}            // This is passed as a prop. Represents the battle number
                metadata = {gameSession.metadata}
              />
            </div>
          ))}
        </div>
      )}
      {gameMode != GameModeIdentifier.BATTLE_ROYALE ? <div/> : 
      <div>
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
          Waiting
        </h2>
        <div className='all-battle-panels-holder'
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr', // Two equal columns
              gap: '1rem', // Space between battles
              alignItems: 'start', // Align battles to the top of their grid cells
              width: '100%',
              // border: '2px solid'
            }}
          >
            {gameSession.waitingPlayers.map((player) => (
              <div>
                {player.getName()}
              </div>
            ))}
        </div>
      </div>
      }
    </div>
  );
};

export default MiddlePanel;