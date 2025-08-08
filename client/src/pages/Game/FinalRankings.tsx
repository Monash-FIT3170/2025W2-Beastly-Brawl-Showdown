import React from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import LogoResizable from "../../components/logos/LogoResizable";
import { BlankPage } from "../../components/pagelayouts/BlankPage";
import { Player } from "/server/src/model/game/player";
import { BaseCard } from "../../components/cards/BaseCard";
import socket from "../../socket";
import { RankingBar } from "../../components/bars/RankingBar";

interface FinalRankingsProps {
  gameCode?: string;
}

export const FinalRankings = ({ gameCode }: FinalRankingsProps) => {
  // Button handler for restarting a new lobby
  const newLobby = () => {
    socket.emit("create-game", {});
    console.log("Game session created");
  };

  // Takes user to 'Host Lobby' page
  // Will use the same tournament mode as the previous one
  socket.on("new-game", ({ code }) => {
    const codeString = code.toString();
    FlowRouter.go(`/host/${codeString}`);
  });

  // Button handler for exiting to home
  const exitToHome = () => {
    // Deletes game session and returns user to 'Home' page
    socket.emit("cancel-game", { gameCode: gameCode });
    FlowRouter.go("/");
  };

  // Temp players
  // const firstPlacePlayer = new Player("placeholder", "Aden")
  // const secondPlacePlayer = new Player("placeholder", "Anika");
  // const thirdPlacePlayer = new Player("placeholder", "Luna");

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
            <div className="w-7/10 m-[-0.15rem]"><RankingBar playerName="Aden" monsterName="Sparking Mouse" rank={1} /></div>
            <div className="w-6/10 m-[-0.15rem]"><RankingBar playerName="Anika" monsterName="Flaming Lizard" rank={2} /></div>
            <div className="w-5/10 m-[-0.15rem]"><RankingBar playerName="Luna" monsterName="Sparking Mouse" rank={3} /></div>
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
