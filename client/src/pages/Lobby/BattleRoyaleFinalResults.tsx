import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";
import socket from "../../socket";
import { RankingBar } from "../../components/bars/RankingBar";
import { PlayerState } from "../../../../types/single/playerState";
import { GameModeIdentifier } from "../../../../types/single/gameMode";

interface BattleRoyaleFinalResultsProps {
  gameCode?: string;
}

export const BattleRoyaleFinalResults = ({ gameCode }: BattleRoyaleFinalResultsProps) => {
  const [finalWinner, setFinalWinner] = useState<PlayerState | null | undefined>(undefined);  // null means there is no final winner (i.e., draws)

  useEffect(() => {
    if (!socket)
      return;

    socket.emit("get-battle-royale-final-results", { gameCode });
    socket.on("battle-royale-final-results-response", ({ finalWinner }) => {
      setFinalWinner(finalWinner);
    });

    return () => {
      socket.off("battle-royale-final-results-response");
    };
  }, [gameCode]);

  // Wait until final results are available
  if (finalWinner === undefined) {
    console.log("Waiting for winner to be fetched...");
    return (
      <div>
        <OutlineText size="large">
          Loading final results...
        </OutlineText>
      </div>
    );
  }

  console.log(`Winner fetched: ${finalWinner ? finalWinner.name : "There is no final winner"}\n`);

  // Button handler for restarting a new battle royale lobby
  const newLobby = () => {
    socket.emit("create-game", { mode: GameModeIdentifier.BATTLE_ROYALE, selectedValue: null });
    console.log("Game session created");
  };

  // Button handler for exiting to home
  const exitToHome = () => {
    socket.emit("cancel-game", { gameCode });
    FlowRouter.go("/");
  };

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
              The Final Winner:
            </OutlineText>
          </div>
          <div className="w-full flex flex-col gap-[1rem]">
            <div className="w-7/10 m-[-0.15rem]">
              {finalWinner ? (
                <RankingBar player={finalWinner} rank={1} />
              ) : (
                <OutlineText size="large">
                  There is no winner.
                </OutlineText>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center h-1/2 space-x-10">
        <ButtonGeneric color="ronchi" size="large" onClick={newLobby}>
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
