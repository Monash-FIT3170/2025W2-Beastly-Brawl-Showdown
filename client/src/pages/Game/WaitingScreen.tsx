import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { MonsterImageResizable } from "../../components/player-screen/monsters/MonsterImageResizable";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";

const WaitingScreen: React.FC = () => {

  // Sample battle stats data - TODO: Replace this with real player's data
  const [battleStats, setBattleStats] = useState({
    battleWon: 3,
    mostDamageDealt: 20,
    abilitiesUsed: 5,
    criticalHitsDealt: 3,
    successfulBlocks: 2,
  });

  useEffect(() => {
    socket.on("battle_started", (battleId: string) => {
      FlowRouter.go(`/battle/${battleId}`);
    });

    return () => {
      socket.off("battle_started");
    };
  }, []);

  return (
    <div className="bg-peach lg:p-[1.25rem] sm:p-[3rem] h-screen w-min-screen overflow-hidden flex flex-col justify-around">
      {/* Top Section */}
      <div className="flex flex-col items-center justify-center mt-[-3rem] ">
        <h1 className="text-3xl font-bold mb-4">Waiting For Host To Start</h1>
        <MonsterImageResizable name="ShadowFangPredator" width={13} height={13} />
      </div>

      {/* Lobby stats (Using <BlankPage> styling but resized)*/}
      <div className="bg-goldenRod outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center p-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Lobby Stats</h2>
        <div className="flex flex-row justify-between w-full max-w-md space-y-2">

        <div className="grid grid-cols-1 gap-y-2 gap-x-40 max-w-md w-full">
        <OutlineText size="medium">
          Battle Won: {battleStats.battleWon}
        </OutlineText>
        <OutlineText size="medium">
          Abilities Used: {battleStats.abilitiesUsed}
        </OutlineText>
        <OutlineText size="medium">
          Most Damage Dealt: {battleStats.mostDamageDealt}
        </OutlineText>
        <OutlineText size="medium">
          Successful Blocks: {battleStats.successfulBlocks}
        </OutlineText>
        <OutlineText size="medium">
          Critical Hits Dealt: {battleStats.criticalHitsDealt}
        </OutlineText>
      </div>

      </div>

        {/* For now, EXIT just changes the screen to the home page. TODO: Route users who exit the game appropriately */}
        <ButtonGeneric color="red" size="medium" onClick={() => FlowRouter.go("/")}>
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <div>
              <OutlineText size="medium">
                EXIT LOBBY
              </OutlineText>
            </div>
          </div>
        </ButtonGeneric>
      </div>
    </div>
  );
};

export default WaitingScreen;