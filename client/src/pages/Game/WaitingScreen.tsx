import React, { useEffect, useState } from "react";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import socket from "../../socket";
import { MonsterImageResizable } from "../../components/player-screen/monsters/MonsterImageResizable";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { OutlineText } from "../../components/texts/OutlineText";
import { Screens } from "../../screens";
import { PopupClean } from "../../components/popups/PopupClean";
import { BlackText } from "../../components/texts/BlackText";

interface WaitingScreenProps {
  setScreen: (screen: Screens) => void;
}

const WaitingScreen: React.FC<WaitingScreenProps> = ({ setScreen }) => {
  // Sample battle stats data - TODO: Replace this with real player's data
  const [battleStats, setBattleStats] = useState({
    battleWon: 0,
    mostDamageDealt: 0,
    abilitiesUsed: 0,
    criticalHitsDealt: 0,
    successfulBlocks: 0,
  });
  const [playerMonster, setPlayerMonster] = useState<string>("");
  const [exit, setExit] = useState<Boolean>(false);
  const [exitPopup, setExitPopup] = useState<Boolean>(false);

  // Listen for battle start event + send req to server for player's detail
  useEffect(() => {
    socket.emit("request_waiting_screen_data");
    socket.on("battle_started", (battleId: string) => {
      FlowRouter.go(`/battle/${battleId}`);
    });

    return () => {
      socket.off("battle_started");
    };
  }, []);

  socket.on("kick-warning", ({ message }) => {
    console.log(message);
    // UPDATE: add pop up when kicked
    setExitPopup(true);
  });

  const leave = () => {
    socket.emit("leave-game", { userID: socket.id });
    FlowRouter.go("/");
  };

  const sendHome = () => {
    FlowRouter.go("/");
  };

  // Listen to server to wait for a response with the player's monster name
  // We can use this to pass in more of the player's information for the lobby stats page later...
  useEffect(() => {
    socket.on("waiting_screen_data", (data: { monsterName: string }) => {
      const monsterName = data.monsterName.toUpperCase();
      console.log(`Received waiting screen data: ${monsterName}`);
      setPlayerMonster(monsterName);
    });

    return () => {
      socket.off("waiting_screen_data");
    };
  });

  return (
    <div className="bg-peach lg:p-[1.25rem] sm:p-[3rem] h-screen w-min-screen overflow-hidden flex flex-col justify-around">
      {/* Title - Using OutlineText styling as text sizing needs to be modified */}
      <div className="bg-pictonBlue outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col items-center justify-center p-4 mt-[-3rem]">
        <p className="text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] xl:text-[4rem] font-[Jua] text-outline text-center">
          WAITING FOR HOST TO START GAME
        </p>
      </div>

      {/* Popup */}
      {exitPopup && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">
              YOU HAVE BEEN REMOVED FROM THE GAME SESSION.
            </OutlineText>
            <div className="mt-10 flex flex-col items-center">
              <ButtonGeneric
                size="large"
                color="red"
                onClick={() => sendHome()}
              >
                EXIT
              </ButtonGeneric>
            </div>
          </div>
        </PopupClean>
      )}

      {/* Monster Image - Centered */}
      <div className="flex justify-center">
        <MonsterImageResizable name={playerMonster} width={13} height={13} />
      </div>

      {/* Lobby stats (Using <BlankPage> styling but resized)*/}
      <div className="bg-goldenRod outline-blackCurrant lg:outline-[0.25rem] sm:outline-[0.75rem] rounded-2xl flex flex-col justify-around items-center p-4">
        <h2 className="text-[3rem] xl:text-medium font-[Jua] text-outline">
          Lobby Stats
        </h2>
        <div className="flex flex-col items-center w-full max-w-md space-y-2">
          <div className="grid grid-cols-1 gap-y-2 max-w-md w-full text-center">
            <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
              Battle Won: {battleStats.battleWon}
            </p>
            <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
              Abilities Used: {battleStats.abilitiesUsed}
            </p>
            <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
              Most Damage Dealt: {battleStats.mostDamageDealt}
            </p>
            <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
              Successful Blocks: {battleStats.successfulBlocks}
            </p>
            <p className="text-[3rem] xl:text-medium font-[Jua] text-outline">
              Critical Hits Dealt: {battleStats.criticalHitsDealt}
            </p>
          </div>
        </div>

        {exit && (
          <PopupClean>
            <div className="flex flex-col justify-around">
              <OutlineText size="extraLarge">
                Are you sure you want to leave the lobby?
              </OutlineText>
              <div className="flex flex-row justify-between items-center">
                <ButtonGeneric
                  size="large"
                  color="red"
                  onClick={() => setExit(false)}
                >
                  BACK
                </ButtonGeneric>
                <ButtonGeneric
                  size="large"
                  color="blue"
                  onClick={() => leave()}
                >
                  CONFIRM
                </ButtonGeneric>
              </div>
            </div>
          </PopupClean>
        )}

        {/* For now, EXIT just changes the screen to the home page. TODO: Route users who exit the game appropriately + disconnects them from battle appropriately */}
        <ButtonGeneric color="red" size="medium" onClick={() => setExit(true)}>
          <div className="flex flex-row items-center justify-around w-full h-full space-x-3">
            <div>
              <OutlineText size="medium">EXIT LOBBY</OutlineText>
            </div>
          </div>
        </ButtonGeneric>
      </div>
    </div>
  );
};

export default WaitingScreen;
