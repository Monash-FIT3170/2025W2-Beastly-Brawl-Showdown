import React from 'react';
import './HealthBar.css';

interface HealthBarProps {
  current: number;
  max: number;
}

export const HealthBar = ( {current, max}: HealthBarProps ) => {
  const percent = Math.max(0, Math.min(100, (current / max) * 100));

  let fillColor = 'green';
  if (percent <= 50 && percent > 20) fillColor = 'orange';
  else if (percent <= 20) fillColor = 'red';

  return (
    <div className="health-bar-container">
      <div
        className="health-bar-fill"
        style={{ width: `${percent}%`, backgroundColor: fillColor }}
      ></div>
    </div>
  );
};