import React, { useState, useEffect } from "react";
import socket from "../../socket";
import { ActionState } from "/types/single/actionState";
import { BattleState } from "/types/composite/battleState";
import BattleHeader from "../../components/player-screen/BattleHeader";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import DiceRollModal from "./DiceRollModal";
import WinnerScreen from "./WinnerScreen";
import LoserScreen from "./LoserScreen";
import DrawScreen from "./DrawScreen";
import { BattleFooter } from "../../components/cards/BattleFooter";
import { FadingBattleText } from "../../components/texts/FadingBattleText";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { PopupClean } from "../../components/popups/PopupClean";
import { OutlineText } from "../../components/texts/OutlineText";
import { BlackText } from "../../components/texts/BlackText";
import {GameSessionStateMetaData} from "/types/composite/gameSessionState"

interface BattleProps {
  battleId: string | null; // Add battleId as a prop
}

const Battle: React.FC<BattleProps> = ({ battleId }) => {
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
  const [metadata, setMetadata] = useState<GameSessionStateMetaData |null>();

  var backgroundLocation = "ARCTIC"; //TODO: change this to be based off level/monster?
  var backgroundString =
    "url('/assets/backgrounds/" + backgroundLocation + ".jpg')";

  useEffect(() => {
    socket.on("battle_state", (data) => {
      console.log("[BATTLESTATE]: ", data.battle)
      console.log("[METADATA]: ", data.metadata)
      setBattleState(data.battle);
      setMetadata(data.metadata)
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      setPossibleActions(actions);
    });

    socket.on("timer", (time: number) => {
      console.log(`Timer: ${time}`);
      setTimer(time);
    });

    socket.on("battle_end", ({ result, winners }) => {
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
      setIsBattleClosed(true)
      setGameCode(data.gameCode)
    })

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
      setTime((prev) => prev - 1);
    }, 1000); //1 second per interval

    //Redirect after countdown is finished
    const timeout = setTimeout(() => {
      FlowRouter.go("./");
      setTime(-1);
    }, 5000); // 5 seconds before user get directed to home page

    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    };
  }, [isSessionCancelled]);

    useEffect(() => {
    if (!isBattleClosed){return}

    //Countdown before player get redirected
    const countdown = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000); //1 second per interval

    //Redirect after countdown is finished
    const timeout = setTimeout(() =>{
      FlowRouter.go(`/session/${gameCode}`)
      setTime(-1)
    }, 5000) // 5 seconds before user get directed to home page
    
    return () => {
      clearInterval(countdown); // interval cleanup
      clearTimeout(timeout); //timeout cleanup
    }
    
  }, [isBattleClosed])

  socket.on("new-connect", () => {
    FlowRouter.go("/");
  });

  return (
    <>
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
      <OutlineText size = 'extraLarge'>BATTLE CLOSED</OutlineText>
      <BlackText size = 'large'>BATTLE HAS ENDED</BlackText>
      <BlackText size = 'large'>YOU WILL BE DIRECTED BACK TO THE WAITING ROOM IN {time} SECONDS</BlackText>
      </div>
    </PopupClean>)}


      <div
        className="inset-0 w-screen h-screen bg-cover bg-center overscroll-contain"
        style={{ backgroundImage: backgroundString }}
      >
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
                <div className="flex flex-row h-1/2 w-full items-start justify-center">
                  <BattleHeader battleState={battleState} timer={timer} metadata = {metadata}/>
                </div>
                <div className="flex flex-row h-1/4 w-full items-center justify-around">
                  

                  <BattleMonsterPanel battleState={battleState} />

                  <div
                    className="battle-logs-stack mt-[60%] xl:mt-[15%]"
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
export default Battle;
