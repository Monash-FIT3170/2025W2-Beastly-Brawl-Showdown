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
    socket.emit("cancel-game", { gameCode });
    FlowRouter.go("/host/choose-mode");
  };

  // Button handler for exiting to home
  const exitToHome = () => {
    socket.emit("cancel-game", { gameCode });
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
  const width1st = "w-8/10";
  const width2nd = "w-7/10";
  const width3rd = "w-6/10";
  let bar1Width: string;
  let bar2Width: string;
  let bar3Width: string | undefined = undefined;
  let bar1Rank: number;
  let bar2Rank: number;
  let bar3Rank: number | undefined = undefined;
  if (score3) {  // There are 3 players in top 3
    if (score1.points > score2.points && score2.points > score3.points) {
      bar1Width = width1st;
      bar2Width = width2nd;
      bar3Width = width3rd;
      bar1Rank = 1;
      bar2Rank = 2;
      bar3Rank = 3;
    } else if (score1.points > score2.points && score2.points == score3.points) {
      bar1Width = width1st;
      bar2Width = width2nd;
      bar3Width = width2nd;
      bar1Rank = 1;
      bar2Rank = 2;
      bar3Rank = 2;
    } else if (score1.points == score2.points && score2.points > score3.points) {
      bar1Width = width1st;
      bar2Width = width1st;
      bar3Width = width2nd;
      bar1Rank = 1;
      bar2Rank = 1;
      bar3Rank = 2;
    } else {  // score1.points == score2.points && score2.points == score3.points
      bar1Width = width1st;
      bar2Width = width1st;
      bar3Width = width1st;
      bar1Rank = 1;
      bar2Rank = 1;
      bar3Rank = 1;
    }
  } else {  // There are only 2 players in top 3
    if (score1.points > score2.points) {
      bar1Width = width1st;
      bar2Width = width2nd;
      bar1Rank = 1;
      bar2Rank = 2;
    } else {  // score1.points == score2.points
      bar1Width = width1st;
      bar2Width = width1st;
      bar1Rank = 1;
      bar2Rank = 1;
    }
  }

  return (
    <BlankPage>
      <div className="flex flex-row h-1/5 w-full items-center justify-between px-4 pt-4">
        <LogoResizable className="h-full w-1/11" />
        <BaseCard color="springLeaves" width={30} height={5}>
          <OutlineText size="large">
            FINAL RESULTS
          </OutlineText>
        </BaseCard>
        <LogoResizable className="h-full w-1/11 invisible" />
      </div>

      <div className="flex flex-row h-full w-full items-center justify-between pt-[2rem] px-[10rem]">
        <div className="flex flex-col h-full w-full items-center bg-peach outline-blackCurrant outline-[0.25rem] rounded-2xl pr-[2rem] py-[2rem]">
          <div className="w-full text-center mb-[1.5rem]">
            <OutlineText size="large">
              The Top {top3Players?.length}:
            </OutlineText>
          </div>
          <div className="w-full flex flex-col gap-[1rem]">
            <div className={bar1Width + " m-[-0.15rem]"}>
              <ScoringRankBar player={player1} rank={bar1Rank} score={score1} />
            </div>
            <div className={bar2Width + " m-[-0.15rem]"}>
              <ScoringRankBar player={player2} rank={bar2Rank} score={score2} />
            </div>
            {/* Only show the 3rd place bar if there exists a 3rd place player in the lobby */}
            {player3 ?
              <div className={bar3Width + " m-[-0.15rem]"}>
                <ScoringRankBar player={player3} rank={bar3Rank!} score={score3!} />
              </div>
            : null}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center h-1/2 space-x-10">
        <ButtonGeneric color="ronchi" size="large" onClick={renderConfigPage}>
          <OutlineText size="large">
            NEW LOBBY
          </OutlineText>
        </ButtonGeneric>
        <ButtonGeneric color="red" size="large" onClick={exitToHome}>
          <OutlineText size="large">
            EXIT TO HOME
          </OutlineText>
        </ButtonGeneric>
      </div>
    </BlankPage>
  );
};
