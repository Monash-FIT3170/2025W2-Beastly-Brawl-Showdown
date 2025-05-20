import React from 'react';

interface MatchSummaryPanelProps {
  children?: React.ReactNode;
}

const MatchSummaryPanel: React.FC<MatchSummaryPanelProps> = ({ children }) => {
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
      {children}
    </div>
  );
};


export default MatchSummaryPanel;