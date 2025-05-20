import React from 'react';
import Background from '../../components/background/Background';

const MatchSummary = () => {
  return (
    <Background imagePath="/path/to/test-image.jpg">
      <div style={{ color: 'white', padding: '20px' }}>
        <h1>Testing Background Component</h1>
        <p>If you see the background image behind this text, it works!</p>
      </div>
    </Background>
  );
};

export default MatchSummary;
