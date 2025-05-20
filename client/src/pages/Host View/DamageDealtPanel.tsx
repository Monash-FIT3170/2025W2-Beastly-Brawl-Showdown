import React from 'react';
import './styles.css';

interface DamageData {
  playerName: string;
  damageAmount: number;
}

interface DamageDealtPanelProps {
  damageData?: DamageData[];
}

const DamageDealtPanel: React.FC<DamageDealtPanelProps> = ({ 
  damageData = [
    { playerName: 'CAMERON', damageAmount: 15 },
    { playerName: 'ANIKA', damageAmount: 12 },
    { playerName: 'DEVAN', damageAmount: 11 }
  ]
}) => {
  return (
    <div className="stats-panel">
      <h3 className="stats-header">DAMAGE DEALT</h3>
      <div className="stats-content">
        {damageData.map((player, index) => (
          <div className="stats-row" key={index}>
            <span className="player-name">{player.playerName}</span>
            <span className="player-stat">{player.damageAmount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DamageDealtPanel;