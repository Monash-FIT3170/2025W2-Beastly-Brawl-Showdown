import React from "react";
import "./HealthBar.css";
import { OutlineText } from "../texts/OutlineText";

interface HealthBarProps {
  current: number;
  max: number;
  isLeftPlayer?: boolean|null;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max, isLeftPlayer = true }) => {
  const percentage = Math.floor(current / max * 100);

  let color = "bg-conifer";
  if (percentage === 0) color = "bg-gray-400";
  else if (percentage <= 20) color = "bg-burntSienna";
  else if (percentage <= 50) color = "bg-schoolBusYellow";

  return (
    <div className="health-bar" style={{ position: 'relative' }}>
      <div
        className={`health-bar-fill ${color}`}
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      >
      </div>
      <div 
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          left: isLeftPlayer ? '8px' : 'auto',
          right: isLeftPlayer ? 'auto' : '8px',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <OutlineText size="small">
          {current}/{max}
        </OutlineText>
      </div>
    </div>
  );
};

export default HealthBar;