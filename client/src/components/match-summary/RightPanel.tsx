import React from 'react';
import LogPanel from './LogPanel';
import RoundSummaryPanel from './RoundSummaryPanel';
import { MultipleBattleState } from '/types/composite/multipleBattleState';

interface RightPanelProps {
  battleStates?: MultipleBattleState|null;
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
      <LogPanel battleState={battleStates} />
    </div>
  );
};

export default RightPanel;