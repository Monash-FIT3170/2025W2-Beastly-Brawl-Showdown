import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";
import socket from "../../socket";
import { ScoringRankBar } from "../../components/bars/ScoringRankBar";
import { PlayerState } from "../../../../types/single/playerState";
import { PlayerScore } from "../../../../types/single/playerScore";

interface FinalResultsScoringTournamentProps {
  gameCode?: string;
}

export const FinalResultsScoringTournament = ({ gameCode }: FinalResultsScoringTournamentProps) => {
  const [top3Players, setTop3Players] = useState<PlayerState[] | undefined>(undefined);
  const [top3Scores, setTop3Scores] = useState<PlayerScore[] | undefined>(undefined);

  useEffect(() => {
    if (!socket)
      return;

    socket.emit("request-final-results", { gameCode });
    socket.on("final-results", ({ finalResults }) => {
      setTop3Players(finalResults.top3Players);
      setTop3Scores(finalResults.top3Scores);
    });

    return () => {
      socket.off("final-results");
    };
  }, [gameCode]);

  // Wait until final results are available
  if (!top3Players && !top3Scores) {
    console.log("Waiting for top3 to be fetched...");
    return (
      <div>
        <OutlineText size="large">
          Loading final results...
        </OutlineText>
      </div>
    );
  }

  console.log(`Top 3 players: ${top3Players?.map((player) => player.name)}\nTop 3 scores: ${top3Scores?.map((playerScore) => playerScore.points)}`);

  // Button handler for restarting a new lobby
  const renderConfigPage = () => {
    // socket.emit("cancel-game", { gameCode });
    FlowRouter.go("/host/choose-mode");
  };

  // Button handler for exiting to home
  const exitToHome = () => {
    // socket.emit("cancel-game", { gameCode });
    FlowRouter.go("/");
  };

  const player1 = top3Players![0];
  const score1 = top3Scores![0];
  const player2 = top3Players![1];
  const score2 = top3Scores![1];
  let player3: PlayerState | undefined = undefined;
  let score3: PlayerScore | undefined = undefined;
  if (top3Players!.length >= 3) {
    player3 = top3Players![2];
    score3 = top3Scores![2];
  }

  // Check the scores to see which combination of ranks is correct
  // Possible combinations for 2 players:
  //   1st, 2nd
  //   1st, 1st
  // Possible combinations for 3 players:
  //   1st, 2nd, 3rd
  //   1st, 2nd, 2nd
  //   1st, 1st, 2nd
  //   1st, 1st, 1st
  let barRanks: (number)[];  // [bar1Rank, bar2Rank, bar3Rank]
  if (score3) {  // There are 3 players in top 3
    if (score1.points > score2.points && score2.points > score3.points) {
      barRanks = [1, 2, 3];
    } else if (score1.points > score2.points && score2.points == score3.points) {
      barRanks = [1, 2, 2];
    } else if (score1.points == score2.points && score2.points > score3.points) {
      barRanks = [1, 1, 2];
    } else {  // score1.points == score2.points && score2.points == score3.points
      barRanks = [1, 1, 1];
    }
  } else {  // There are only 2 players in top 3
    if (score1.points > score2.points) {
      barRanks = [1, 2, -1];
    } else {  // score1.points == score2.points
      barRanks = [1, 1, -1];
    }
  }

  return (
    <BlankPage>
      <div className="flex lg:flex-row lg:h-1/4 sm:flex-col w-full">
        <div className="flex flex-row w-1/8 sm:h-1/2">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <LogoResizable className="h-[200%] w-[200%]" />
          </div>
        </div>
        <div className="flex flex-row lg:h-full lg:w-3/4 sm:h-3/4 lg:items-start sm:items-end justify-around">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <BaseCard color="springLeaves" width={50} height={8}>
              <OutlineText size="extraLarge">
                FINAL RESULTS
              </OutlineText>
            </BaseCard>
          </div>
        </div>
      </div>

        <div className="flex flex-col items-center justify-start w-3/4 bg-peach outline-blackCurrant outline-[0.25rem] rounded-2xl px-6 py-2 h-[200%]">
          <div className="w-full text-center mb-[1.5rem]">
            <OutlineText size="large">
              The Top {top3Players?.length}:
            </OutlineText>
          </div>
          <div className="w-full flex flex-col gap-[1.5rem] flex-grow">
            <div className="ml-[-1.6rem] flex-1">
              <ScoringRankBar player={player1} rank={barRanks[0]} score={score1} />
            </div>
            <div className="ml-[-1.6rem] flex-1">
              <ScoringRankBar player={player2} rank={barRanks[1]} score={score2} />
            </div>
            {/* Only show the 3rd place bar if there exists a 3rd place player in the lobby */}
            {player3 ?
              score3 ?
                <div className="ml-[-1.6rem] flex-1">
                  <ScoringRankBar player={player3} rank={barRanks[2]} score={score3} />
                </div>
              : null
            : null}
          </div>
        </div>

      <div className="flex flex-row items-center justify-center h-1/2 space-x-[5rem]">
        <ButtonGeneric color="ronchi" size="medium" onClick={renderConfigPage}>
          <OutlineText size="medium">
            NEW LOBBY
          </OutlineText>
        </ButtonGeneric>
        <ButtonGeneric color="red" size="medium" onClick={exitToHome}>
          <OutlineText size="medium">
            EXIT TO HOME
          </OutlineText>
        </ButtonGeneric>
      </div>
    </BlankPage>
  );
};
