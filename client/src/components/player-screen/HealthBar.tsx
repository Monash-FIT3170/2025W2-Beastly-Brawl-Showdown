import React from "react";
import "./HealthBar.css";

interface HealthBarProps {
  current: number;
  max: number;
}

const HealthBar: React.FC<HealthBarProps> = ({ current, max }) => {
  const percentage = (current / max) * 100;

  let color = "green";
  if (percentage <= 20) color = "red";
  else if (percentage <= 50) color = "orange";

  return (
    <div className="health-bar">
      <div
        className="health-bar-fill"
        style={{
          width: `${percentage}%`,
          backgroundColor: color,
        }}
      >
        <span className="health-bar-text">{current}/{max}</span>
      </div>
    </div>
  );
};

export default HealthBar;