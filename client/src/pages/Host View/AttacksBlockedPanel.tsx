import React from 'react';
import './styles.css';

interface BlockData {
  playerName: string;
  blocksAmount: number;
}

interface AttacksBlockedPanelProps {
  blockData?: BlockData[];
}

const AttacksBlockedPanel: React.FC<AttacksBlockedPanelProps> = ({ 
  blockData = [
    { playerName: 'DANIEL', blocksAmount: 3 },
    { playerName: 'LUNA', blocksAmount: 2 },
    { playerName: 'RIO', blocksAmount: 1 }
  ]
}) => {
  return (
    <div className="stats-panel">
      <h3 className="stats-header">ATTACKS BLOCKED</h3>
      <div className="stats-content">
        {blockData.map((player, index) => (
          <div className="stats-row" key={index}>
            <span className="player-name">{player.playerName}</span>
            <span className="player-stat">{player.blocksAmount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttacksBlockedPanel;