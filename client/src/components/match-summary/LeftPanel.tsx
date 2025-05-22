import React from 'react';
import './styles.css';
import DamageDealtPanel from './DamageDealtPanel';
import AttacksBlockedPanel from './AttacksBlockedPanel';
import MostPopularPanel from './MostPopularPanel';
import MatchStatistics from './MatchStatistics';


interface LeftPanelProps {
  damageData?: Array<{ playerName: string; damageAmount: number }>;
  blockData?: Array<{ playerName: string; blocksAmount: number }>;
  popularMonster?: {
    monsterName: string;
    percentagePick: string;
  };
}

const LeftPanel: React.FC<LeftPanelProps> = ({ 
  damageData,
  blockData,
  popularMonster
}) => {
  return (
    <div className="left-panel">
      {/* Match Statistics Header */}
      <MatchStatistics/>
      
      {/* Damage Dealt Panel */}
      <DamageDealtPanel damageData={damageData} />
      
      {/* Attacks Blocked Panel */}
      <AttacksBlockedPanel blockData={blockData} />
      
      {/* Most Popular Panel */}
      {popularMonster && (
        <MostPopularPanel
          monsterName={popularMonster.monsterName}
          percentagePick={popularMonster.percentagePick}
      />
)}

    </div>
  );
};

export default LeftPanel;