import React from 'react';
import LogPanel from './LogPanel';
import RoundSummaryPanel from './RoundSummaryPanel';
import { GameSessionState } from '/types/composite/gameSessionState';
import { BattleState } from '/types/composite/battleState';

interface RightPanelProps {
  battleStates?: BattleState[]|null;
  // Add other props for RoundSummaryPanel as needed
}

const RightPanel: React.FC<RightPanelProps> = ({ battleStates }) => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        height: '100%',
        overflow: 'auto',
      }}
    >
      {/* Round Summary Panel */}
      <RoundSummaryPanel />
    
          {/* Log Panel */}
          <LogPanel battleStates={battleStates} />
 
    </div>
  );
};

export default RightPanel;