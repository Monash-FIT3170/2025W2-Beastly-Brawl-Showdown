import React from 'react';
import './styles.css';
import DamageDealtPanel from './DamageDealtPanel';
import AttacksBlockedPanel from './AttacksBlockedPanel';
import MostPopularPanel from './MostPopularPanel';
import MatchStatistics from './MatchStatistics';

import { BlockData, DamageData } from '../../types/data';
import { MostChosenMonsterResult } from '/types/other/gameSessionData';


interface LeftPanelProps {
  damageData: Array<DamageData>;
  blockData: Array<BlockData>;
  popularMonster: MostChosenMonsterResult;
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
  {popularMonster && popularMonster.monster && (
    <div style={{ width: '100%' }}>
      <MostPopularPanel
        popularMonster={popularMonster}
      />
    </div>
  )}
</div>

  );
};

export default LeftPanel;