import React from 'react';
import Background from '../../components/background/Background';
import HostBattles from '../Lobby/HostBattles';

interface MatchSummaryProps{
  gameCode?: string;
}
const MatchSummary: React.FC<MatchSummaryProps> = ({ gameCode }) => {
  return (
    <Background>
        <HostBattles gameCode={gameCode}/>
    </Background>
  );
};

export default MatchSummary;
