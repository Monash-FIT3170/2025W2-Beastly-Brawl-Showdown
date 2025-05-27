import React from "react";
import "./HealthBar.css";

interface HealthBarProps {
  current: number;
  max: number;
  isLeftPlayer?: boolean|null;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max, isLeftPlayer = true }) => {
  const percentage = (current / max) * 100;

  let color = "green";

  if (percentage === 0) color = "grey";
  else if (percentage <= 20) color = "red";
  else if (percentage <= 50) color = "orange";

  return (
    <div className="health-bar" style={{ position: 'relative' }}>
      <div
        className="health-bar-fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      >
      </div>
      <span 
        className="health-bar-text"
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
        {current}/{max}
      </span>
    </div>
  );
};

export default HealthBar;