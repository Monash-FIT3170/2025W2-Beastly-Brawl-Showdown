import React, { useState, useEffect } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { BaseCard } from "../../components/cards/BaseCard";
import socket from "../../socket";
import { RankingBar } from "../../components/bars/RankingBar";
import { PlayerState } from "/types/single/playerState";

interface FinalResultsProps {
  gameCode?: string;
}

export const FinalResults = ({ gameCode }: FinalResultsProps) => {
  const code = gameCode;
  const [players, setPlayers] = useState<PlayerState[] | null>(null);

  // When the page loads, keep attempting to fetch the players
  useEffect(() => {
    if (!code) return;

    interface UpdatePlayersProps {
      message: string;
      players: PlayerState[];
    }

    // Function handler for updating the 'players' array
    const updatePlayers = ({ message, players }: UpdatePlayersProps) => {
      console.log(message);
      if (Array.isArray(players) && players.length > 0) {
        setPlayers(players);
        socket.off("update-players", updatePlayers);
      } else {
        console.log("'players' is empty or not an array", players);
      }
    };

    socket.emit("get-players", { gameCode: code });
    socket.on("update-players", updatePlayers);

    return () => {
      socket.off("update-players", updatePlayers);
    };
  }, [code]);

  // Wait until players have been fetched
  if (!players) {
    console.log("Waiting for players to be fetched...");
    return <div><OutlineText size="large">Loading final results...</OutlineText></div>;
  }

  /* TODO: Check if this is correct */
  // Button handler for restarting a new lobby
  const newLobby = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  /* TODO: Check if this is correct */
  // Takes user to 'Host Lobby' page
  // Will use the same tournament mode as the previous one
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  /* TODO: Check if this is correct */
  // Button handler for exiting to home
  const exitToHome = () => {
    // Deletes game session and returns user to 'Home' page
    socket.emit("cancel-game", { gameCode: gameCode });
    FlowRouter.go("/");
  };

  // Temporarily hardcoding the players' rankings
  // Hardcoded to use the first 2-3 players
  console.log(`Players fetched: ${players.length}\n`);
  const firstPlace = players[0];
  const secondPlace = players[1];
  let thirdPlace: PlayerState | null = null;
  if (players.length >= 3) {
    thirdPlace = players[2];
  }

  return (
    <BlankPage>
      <div className="flex flex-row h-1/5 w-full items-center justify-between px-4 pt-4">
        <LogoResizable className="h-full w-1/11"></LogoResizable>

        <BaseCard color="springLeaves" width={30} height={5}>
          <OutlineText size="large">FINAL RESULTS</OutlineText>
        </BaseCard>

        <LogoResizable className="h-full w-1/11 invisible"></LogoResizable>
      </div>

      <div className="flex flex-row h-full w-full items-center justify-between pt-[2rem] px-[10rem]">
        <div className="flex flex-col h-full w-full items-center bg-peach outline-blackCurrant outline-[0.25rem] rounded-2xl pr-[2rem] py-[2rem]">
          <div className="w-full text-center mb-[1.5rem]">
            <OutlineText size="large">The Top 3:</OutlineText>
          </div>

          {/* TODO: Fix the bars not being evenly spaced on different-sized screens */}
          <div className="w-full flex flex-col gap-[1rem]">
            <div className="w-7/10 m-[-0.15rem]"><RankingBar player={firstPlace} rank={1} /></div>
            <div className="w-6/10 m-[-0.15rem]"><RankingBar player={secondPlace} rank={2} /></div>
            {/* Only show the 3rd place bar if there exists a 3rd place player in the lobby */}
            {thirdPlace ?
              <div className="w-5/10 m-[-0.15rem]"><RankingBar player={thirdPlace} rank={3} /></div>
            : null}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center h-1/2 space-x-10">
        <ButtonGeneric color="ronchi" size="large" onClick={newLobby}>
            <OutlineText size="large">NEW LOBBY</OutlineText>
        </ButtonGeneric>
        <ButtonGeneric color="red" size="large" onClick={exitToHome}>
            <OutlineText size="large">EXIT TO HOME</OutlineText>
        </ButtonGeneric>
      </div>
    </BlankPage>
  );
};
