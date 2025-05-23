import React from 'react';
import LogPanel from './LogPanel';
import RoundSummaryPanel from './RoundSummaryPanel';
import { BattleState } from '/types/composite/battleState';

interface RightPanelProps {
  battleStates?: BattleState[]|null;
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