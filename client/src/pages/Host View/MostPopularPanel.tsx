import React from 'react';
import './styles.css';

interface MostPopularPanelProps {
  pokemonName?: string;
  pickRate?: number;
  imageSrc?: string;
}

const MostPopularPanel: React.FC<MostPopularPanelProps> = ({ 
  pokemonName = 'SPARKING MOUSE',
  pickRate = 42,
  imageSrc = '/match-summary-assets/Attacker.png'
}) => {
  return (
    <div className="stats-panel">
      <h3 className="stats-header">MOST POPULAR</h3>
      <div className="stats-content popular-content">
        <img 
          src={imageSrc} 
          alt={pokemonName} 
          className="pokemon-icon"
        />
        <div className="popular-info">
          <div className="pokemon-name">{pokemonName}</div>
          <div className="pick-rate">PICK: {pickRate}%</div>
        </div>
      </div>
    </div>
  );
};

export default MostPopularPanel;