import React from 'react';
import RoundNumberHeader from './RoundNumberHeader';

interface MatchSummaryPanelProps {
  roundNumber?: number;
}

const MatchSummaryPanel: React.FC<MatchSummaryPanelProps> = ({ 
    roundNumber = 2 
 }) => {
  return (
    <div 
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: '1rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        padding: '1rem',
        margin: '0', // no margin because we'll control spacing by inset
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        right: '1rem',
        bottom: '1rem',
        overflow: 'auto',
      }}
    >   

    <RoundNumberHeader roundNumber={roundNumber} />

    </div>
  );
};


export default MatchSummaryPanel;