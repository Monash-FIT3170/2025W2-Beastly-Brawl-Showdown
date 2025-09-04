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

interface FinalResultsBattleRoyaleProps {
  gameCode?: string;
}

export const FinalResultsBattleRoyale = ({ gameCode }: FinalResultsBattleRoyaleProps) => {
  const [finalWinner, setFinalWinner] = useState<PlayerState | null | undefined>(undefined);  // null means there is no final winner (i.e., draws)

  useEffect(() => {
    if (!socket)
      return;

    socket.emit("request-final-results", { gameCode });
    socket.on("final-results", ({ finalResults }) => {
      setFinalWinner(finalResults.finalWinner);
    });

    return () => {
      socket.off("final-results");
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

  console.log(`Winner fetched: ${finalWinner ? finalWinner.name : "There is no final winner"}`);

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
      <div className="flex lg:flex-row lg:h-1/4 sm:flex-col w-full">
        <div className="flex flex-row w-1/8 sm:h-1/2">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <LogoResizable className="h-[200%] w-[200%]" />
          </div>
        </div>
        <div className="flex flex-row lg:h-full lg:w-3/4 sm:h-3/4 lg:items-start sm:items-end justify-around">
          <div className="lg:ml-2 lg:mt-2 sm:ml-6 sm:mt-6">
            <BaseCard color="peach" width={50} height={8}>
              <OutlineText size="extraLarge">{finalWinner ? "FINAL WINNER" : "NO SURVIVORS"}</OutlineText>
            </BaseCard>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-start w-3/4 bg-peach outline-blackCurrant outline-[0.25rem] rounded-2xl px-6 py-2">
        {finalWinner ? (
          <>
            <div className="mb-2 text-center">
              <OutlineText size="large">{finalWinner.name}</OutlineText>
              <OutlineText size="medium">{finalWinner.monster?.name}</OutlineText>
            </div>
            <img
              className="max-w-full max-h-[300px] object-contain"
              src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/ending/${finalWinner.monster?.id}_WIN.png`}
              alt={`${finalWinner.monster?.id}_WIN image`}
            />
          </>
        ) : (
          <img
            className="max-w-full max-h-[300px] object-contain"
            src={`https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/misc/GRAVE.png`}
            alt="GRAVE image"
          />
        )}
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
