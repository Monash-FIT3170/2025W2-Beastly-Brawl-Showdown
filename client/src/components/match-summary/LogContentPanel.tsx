import React from 'react';
import './styles.css';

interface LogContentPanelProps {
  logs?: string[] | null;
}

const LogContentPanel: React.FC<LogContentPanelProps> = ({ logs }) => {
  if (!logs || logs.length === 0) {
    return <div>No logs available.</div>;
  }

  return (
    <div>
      {logs.map((log, index) => (
        <div key={index} style={{ margin: '0.25rem 0' }}>
          {log}
        </div>
      ))}
    </div>
  );
};

export default LogContentPanel;
