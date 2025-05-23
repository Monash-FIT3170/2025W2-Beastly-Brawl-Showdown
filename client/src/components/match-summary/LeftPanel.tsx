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
  <div style={{ width: '100%' }}>
    <MatchStatistics />
  </div>
  <div style={{ width: '100%' }}>
    <DamageDealtPanel damageData={damageData} />
  </div>
  <div style={{ width: '100%' }}>
    <AttacksBlockedPanel blockData={blockData} />
  </div>
  {popularMonster && (
    <div style={{ width: '100%' }}>
      <MostPopularPanel
        monsterName={popularMonster.monsterName}
        percentagePick={popularMonster.percentagePick}
      />
    </div>
  )}
</div>

  );
};

export default LeftPanel;