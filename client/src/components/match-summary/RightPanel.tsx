import React from 'react';
import LogPanel from './LogPanel';
import RoundSummaryPanel from './RoundSummaryPanel';

interface RightPanelProps {
  logs?: string[];
  // Add other props for RoundSummaryPanel as needed
}

const RightPanel: React.FC<RightPanelProps> = ({ logs }) => {
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
      <LogPanel logs={logs} />
    </div>
  );
};

export default RightPanel;