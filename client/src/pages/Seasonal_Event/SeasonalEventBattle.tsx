import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import React, { useEffect, useState } from "react";
import socket from "../../socket";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";
import { GenericIcon } from "../../components/icons/GenericIcon";
import { IconButton } from "../../components/buttons/IconButton";
import { MonsterIdentifier } from "../../../../types/single/monsterState";
import { SeasonalEventIdentifier } from "../../../../types/single/seasonalEventState";
import { motion, AnimatePresence, time } from "framer-motion";
import { BaseCard } from "../../components/cards/BaseCard";
import { eventMeta } from "../../data/eventMeta";
import { monsterMeta } from "../../data/monsterMeta";
import { BattleFooter } from "../../components/cards/BattleFooter";
import BattleHeader from "../../components/player-screen/BattleHeader";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import { MonsterInfoPopup } from "../../components/popups/MonsterInfoPopup";
import { PopupClean } from "../../components/popups/PopupClean";
import { FadingBattleText } from "../../components/texts/FadingBattleText";
import DiceRollModal from "../Game/DiceRollModal";
import DrawScreen from "../Game/DrawScreen";
import LoserScreen from "../Game/LoserScreen";
import WinnerScreen from "../Game/WinnerScreen";
import AdventureBattleHeader from "../../components/player-screen/AdventureBattleHeader";
import { LeavePopup } from "../../components/popups/AdventureLeavePopup";
import { BattleState } from "../../../../types/composite/battleState";
import { ActionState } from "../../../../types/single/actionState";
import SeasonalEventBattleHeader from "../../components/player-screen/SeasonalEventBattleHeader";

interface SeasonalEventBattleProps {
  battleId: string | null; // Add battleId as a prop
}

const SeasonalEventBattle: React.FC<SeasonalEventBattleProps> = ({ battleId }) => {
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [timer, setTimer] = useState<number>(10);
  const [winner, setWinner] = useState<string | null>(null);
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice
  const [isSessionCancelled, setIsSessionCancelled] = useState<Boolean>(false); // indicate whether the host is still live
  const [isBattleClosed, setIsBattleClosed] = useState<Boolean>(false); //indiate whether the battle is still live
  const [gameCode, setGameCode] = useState<string>(); // game code for directing player back to game session
  const [time, setTime] = useState<number>(5);
  const [metadata, setMetadata] = useState<GameSessionStateMetaData | null>();
  const [waitForConclusion, setWaitForConclusion] = useState<boolean>(false);
  const [viewingInfo, setViewingInfo] = useState<Boolean>(false);
  const [viewingEnemyInfo, setViewingEnemyInfo] = useState<Boolean>(false);

  const [observedEvent, setObservedEvent] = useState<number>(10);

  // Seasonal Event → Monster mapping
  const eventMap: Record<number, SeasonalEventIdentifier> = {
    10: SeasonalEventIdentifier.SPOOK_GARDEN
  };
  const monsterMap: Record<number, MonsterIdentifier> = {
    10: MonsterIdentifier.JACKEDOLANTERN
  };

  const event = eventMap[observedEvent] ?? SeasonalEventIdentifier.SPOOK_GARDEN;
  const monster = monsterMap[observedEvent] ?? MonsterIdentifier.JACKEDOLANTERN;

  var backgroundLocation = "FOREST"; //TODO: change this to be based off level/monster?
  const backgroundString = `url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/${getBiomeString(
    MonsterIdentifier.JACKEDOLANTERN
  )}.jpg')`;
  // var backgroundString =
  //   "url('https://spaces-bbs.syd1.cdn.digitaloceanspaces.com/assets/background/" +
  //   backgroundLocation +
  //   ".jpg')";

  useEffect(() => {
    socket.on("battle_state", (data) => {
      console.log("[BATTLESTATE]: ", data.battle);
      console.log("[METADATA]: ", data.metadata);
      setBattleState(data.battle);
      setMetadata(data.metadata);
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      setPossibleActions(actions);
    });

    socket.on("timer", (time: number) => {
      console.log(`Timer: ${time}`);
      setTimer(time);
    });

    socket.on("battle_end", ({ result, winners }) => {
      setWaitForConclusion(false);
      console.log(result, winners);
      if (result === "draw") {
        setWinner("Draw");
      } else if (result === "concluded") {
        setWinner(winners[0]);
      }
      console.log("Winner: ", winner);
      if (battleState?.yourPlayer.name === winner) {
        socket.emit("updateWin");
      } else {
        socket.emit("updateLoss");
      }
    });

    // TODO: For future, this should handle socket message 'handle_animation' and pass in an animation identifier
    // to handle all types of animations triggered by actions
    socket.on("roll_dice", (diceRoll: number) => {
      setDiceValue(diceRoll);
      console.log(`From socket in Battle: dps ${diceRoll}`);
      setShowDiceModal(true);
    });

    //Socket to handle the case where the host cancel the game sesion
    socket.on("host-closed", () => {
      setIsSessionCancelled(true);
    });

    socket.on("battle-closed", (data) => {
      setIsBattleClosed(true);
      setGameCode(data.gameCode);
      socket.removeAllListeners("client-wait-conclusion");
    });

    socket.on("client-wait-conclusion", () => {
      setWaitForConclusion(true);
    });

    return () => {
      socket.off("possible_actions");
      socket.off("timer");
      socket.off("turn_over");
    };
  }, []);

  useEffect(() => {
    if (!isSessionCancelled) {
      return;
    }

    //Countdown before player get redirected
    const countdown = setInterval(() => {
      setTime((prev) => Math.max(prev - 1, 0));
    }, 1000); //1 second per interval

    //Redirect after countdown is finished
    const timeout = setTimeout(() => {
      FlowRouter.go("/");
    }, 5000); // 5 seconds before user get directed to home page

    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    };
  }, [isSessionCancelled]);

  useEffect(() => {
    if (!isBattleClosed) {
      return;
    }

    //Countdown before player get redirected
    const countdown = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000); //1 second per interval

    //Redirect after countdown is finished
    const timeout = setTimeout(() => {
      FlowRouter.go(`/session/${gameCode}`);
      setTime(-1);
    }, 5000); // 5 seconds before user get directed to home page

    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    };
  }, [isBattleClosed]);

  socket.on("new-connect", () => {
    FlowRouter.go("/");
  });

  return (
    <>
      {waitForConclusion && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">LAST ROUND COMPLETED</OutlineText>
            <BlackText size="large">
              YOU HAVE FINISHED YOUR LAST BATTLE!
            </BlackText>
            <BlackText size="large">
              WAITING FOR OTHER PLAYERS TO FINISH THEIR BATTLES...
            </BlackText>
          </div>
        </PopupClean>
      )}

      {isSessionCancelled && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">CANCELLED SESSION</OutlineText>
            <BlackText size="large">
              YOUR GAME SESSION HAS BEEN CANCELLED
            </BlackText>
            <BlackText size="large">
              YOU WILL BE DIRECTED BACK TO THE HOME PAGE IN {time} SECONDS
            </BlackText>
          </div>
        </PopupClean>
      )}

      {isBattleClosed && (
        <PopupClean>
          <div className="flex flex-col justify-around">
            <OutlineText size="extraLarge">BATTLE CLOSED</OutlineText>
            <BlackText size="large">BATTLE HAS ENDED</BlackText>
            <BlackText size="large">
              YOU WILL BE DIRECTED BACK TO THE WAITING ROOM IN {time} SECONDS
            </BlackText>
          </div>
        </PopupClean>
      )}

      <div
        className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
        style={{ backgroundImage: backgroundString }}
      >
        {viewingInfo && (
          <MonsterInfoPopup
            playerState={battleState.yourPlayer}
            attackState={battleState.yourPlayer.attackState}
            onClose={() => setViewingInfo(false)}
          ></MonsterInfoPopup>
        )}
        {viewingEnemyInfo && (
          <MonsterInfoPopup
            playerState={battleState.opponentPlayer}
            attackState={battleState.opponentPlayer.attackState}
            onClose={() => setViewingEnemyInfo(false)}
          ></MonsterInfoPopup>
        )}
        {/* Winner display if battle is over */}
        {/*winner === "Draw" ? (
          <DrawScreen />
        ) : */}
        {winner ? (
          winner === "Draw" ? (
            <DrawScreen />
          ) : battleState?.yourPlayer.name === winner ? (
            <WinnerScreen playerMonster={battleState?.yourPlayer.monster} />
          ) : (
            <LoserScreen />
          )
        ) : (
          <>
            {battleState && (
              <div className="flex flex-col h-full w-full items-start space-y-10 ">
                <div className="flex flex-row h-1/4 w-full items-start justify-center">
                  <BattleHeader
                    battleState={battleState}
                    timer={timer}
                    metadata={metadata}
                  />
                </div>
                {/* Buttons */}
                {/* TODO: test button placement */}
                {/* <div className="flex w-full justify-between px-8">
                  <div className="flex lg:gap-5 sm:gap-10">
                    <IconButton
                      style="info"
                      iconColour="black"
                      buttonColour="blue"
                      size="small"
                      onClick={() => setViewingInfo(true)}
                    />
                  </div>

                  <div className="flex lg:gap-5 sm:gap-10 pr-[2rem]">
                    <IconButton
                      style="info"
                      iconColour="black"
                      buttonColour="redpink"
                      size="small"
                      onClick={() => setViewingEnemyInfo(true)}
                    />
                  </div>
                </div> */}

                <div className="flex flex-col h-3/4 w-full items-center justify-around">
                  <BattleMonsterPanel
                    battleState={battleState}
                    slimeString="FOREST"
                  />

                  <div
                    className=" h-screen flex flex-col items-center justify-center content-center mt-[60%] xl:mt-[15%]"
                    style={{
                      position: "relative",
                      width: "100%",
                      height: "120px",
                    }}
                  >
                    {battleState.yourPlayer.logs.map((log, index) => (
                      <FadingBattleText
                        key={index}
                        size="medium-battle-text"
                        style={{ top: `${index * 32}px` }}
                      >
                        {log}
                      </FadingBattleText>
                    ))}
                  </div>

                  <DiceRollModal
                    show={showDiceModal}
                    onClose={() => setShowDiceModal(false)}
                    toRoll={diceValue}
                    battleState={battleState}
                  />
                </div>
              </div>
            )}

            <div>
              {timer > 0 && (
                <BattleFooter
                  possibleActions={possibleActions}
                  battleId={battleId}
                />
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

const biomeMap = new Map([
  [MonsterIdentifier.JACKEDOLANTERN, () => "MARSH"]
]);

export function getBiomeString(monsterID: MonsterIdentifier) {
  //default return is forest :)
  const biomeName = biomeMap.get(monsterID);
  return biomeName ? biomeName() : "FOREST";
}

export default SeasonalEventBattle;