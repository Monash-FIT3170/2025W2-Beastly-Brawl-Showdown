import React from 'react';
import './styles.css';
import DamageDealtPanel from './DamageDealtPanel';
import AttacksBlockedPanel from './AttacksBlockedPanel';
import MostPopularPanel from './MostPopularPanel';
import MatchStatistics from './MatchStatistics';


interface LeftPanelProps {
  remainingPlayers?: number;
  totalPlayers?: number;
  damageData?: Array<{ playerName: string; damageAmount: number }>;
  blockData?: Array<{ playerName: string; blocksAmount: number }>;
  popularPokemon?: {
    name: string;
    pickRate: number;
    imageSrc: string;
  };
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  remainingPlayers = 6, 
  totalPlayers = 16,
  damageData,
  blockData,
  popularPokemon
}) => {
  return (
    <div className="left-panel">
      {/* Match Statistics Header */}
      <MatchStatistics/>

      
      {/* Remaining Players Counter */}
      <div className="remaining-counter">
        REMAINING: {remainingPlayers}/{totalPlayers}
      </div>
      
      {/* Damage Dealt Panel */}
      <DamageDealtPanel damageData={damageData} />
      
      {/* Attacks Blocked Panel */}
      <AttacksBlockedPanel blockData={blockData} />
      
      {/* Most Popular Panel */}
      <MostPopularPanel 
        pokemonName={popularPokemon?.name}
        pickRate={popularPokemon?.pickRate}
        imageSrc={popularPokemon?.imageSrc}
      />
    </div>
  );
};

export default LeftPanel;