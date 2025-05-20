import React from 'react';
import './styles.css'; // Import the CSS file

interface RoundHeaderProps {
  roundNumber?: number;
}

const RoundHeader: React.FC<RoundHeaderProps> = ({ roundNumber = 2 }) => {
  return (
    <div className="round-header" style={{
      padding: '1.7rem 3rem',
      textAlign: 'center',
      margin: '0.5rem auto 1.5rem auto',
      maxWidth: '40%', // Increased width
      boxShadow: '0 4px 8px rgba(64, 50, 69, 0.2)',
      border: '4px solid #403245', // Thicker border to match image

    }}>
      <h1 style={{
      fontSize: '5rem',
      margin: 0,
      letterSpacing: '0.25rem',
      fontWeight: 'bold',
      lineHeight: '1.2',
      padding: '0.5rem 0',
      color: '#FFFFFF', // White text
      WebkitTextStroke: '2px black', // Correct camelCase and string value
    }}>
      ROUND {roundNumber}
    </h1>
    </div>
  );
};

export default RoundHeader;