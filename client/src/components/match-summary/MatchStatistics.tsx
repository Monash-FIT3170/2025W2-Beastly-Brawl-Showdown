// MatchStatisticsHeader.tsx
import React from 'react';

const MatchStatisticsHeader: React.FC = () => {
  return (
    <div
      className="match-stats-header"
      style={{
        backgroundColor: '#EFB056',
        padding: '0.75rem 1.5rem',
        textAlign: 'center',
        borderRadius: '2rem',
        border: '4px solid #403245', // Dark border
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        display: 'inline-block',
        margin: '1rem auto',
        width: '260px'
      }}
    >
      <span
        style={{
          color: '#FFFFFF',
          fontSize: '2rem',
          fontWeight: '20000',
          letterSpacing: '-0.1rem',
          WebkitTextStroke: '2px black',
          fontFamily: '"Jua", sans-serif',
        }}
      >
        MATCH STATISTICS
      </span>
    </div>
  );
};

export default MatchStatisticsHeader;
