import {
  ArchetypeIdentifier,
  MonsterIdentifier,
} from "/types/single/monsterState";
import PlayerInfoPanel from "../../components/player-screen/PlayerInfoPanel";
import BattleMonsterPanel from "../../components/player-screen/BattleMonsterPanel";
import { FadingBattleText } from "../../components/texts/FadingBattleText";
import DiceRollModal from "../Game/DiceRollModal";
import { BattleFooter } from "../../components/cards/BattleFooter";
import { useEffect, useState } from "react";
import { BattleState } from "/types/composite/battleState";
import {
  ActionIdentifier,
  ActionState,
  AttackState,
} from "/types/single/actionState";
import { randomUUID } from "crypto";
import React from "react";
import socket from "../../socket";
import { DialogueBox } from "../../components/cards/DialogueBox";
import { option } from "/types/composite/storyTypes";
import { DialogueChoiceButton } from "../../components/buttons/DialogueChoiceButton";
import { PopupClean } from "../../components/popups/PopupClean";
import { OutlineText } from "../../components/texts/OutlineText";
import { ButtonGeneric } from "../../components/buttons/ButtonGeneric";
import { ChoicePopup } from "../../components/popups/ChoicePopup";
import { FlowRouter } from "meteor/ostrio:flow-router-extra";
import { StatChangePopup } from "../../components/popups/statChangePopup";
import { MonsterState } from "/types/single/monsterState";
import MonsterDisplay from "../../components/player-screen/MonsterDisplay";
import { LeavePopup } from "../../components/popups/AdventureLeavePopup";
import { IconButton } from "../../components/buttons/IconButton";
import { AdventureInfoPanel } from "../../components/player-screen/AdventureInfoPanel";
import { PlayerState } from "/types/single/playerState";
import { Equipment } from "../../../../server/src/model/game/equipment/equipment";
import { AdventureInfoPopup } from "../../components/popups/AdventureInfo";
import { AdventureBagPopup } from "../../components/popups/AdventureBag";
import { EquipmentState } from "/types/single/itemState";
import { EquipmentCard } from "../../components/cards/EquipmentCard";

interface AdventureProps {
  //so i am adding this without actually knowing why just trust the process
  levelMonster: MonsterIdentifier;
}

const AdventureBattle: React.FC<AdventureProps> = ({ levelMonster }) => {
  const battleId = "ADVENTURE";
  var backgroundLocation = getBiomeString(levelMonster); //TODO: change this to be based off level/monster?
  var backgroundString =
    "url('/assets/backgrounds/" + backgroundLocation + ".jpg')";

  //ADVENTURE PAGE:
  const [dialogue, setDialogue] = useState<string[] | null>(null);
  const [attackState, setAttackState] = useState<AttackState | null>();
  const [currentEnemy, setCurrentEnemy] = useState<MonsterState | null>(null);
  const [stage, setStage] = useState<number>(1);

  const [playerState, setPlayerState] = useState<PlayerState | null>();

  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);

  //POPUPS
  const [showLeave, setShowLeave] = useState(false);
  const [viewingInfo, setViewingInfo] = useState<Boolean>(false);
  const [viewingEnemyInfo, setViewingEnemyInfo] = useState<Boolean>(false);
  const [viewingInventory, setViewingInventory] = useState<Boolean>(false);
  const [receivingConsumable, setReceivingConsumable] = useState<string | null>(
    null
  );
  const [receivingEquipment, setReceivingEquipment] = useState<string | null>(
    null
  );
  const [equipmentInventoryFull, setEquipmentInventoryFull] = useState(false);
  const [currentEquipment, setCurrentEquipment] = useState<EquipmentState[]>(
    []
  );
  const [incomingEquipment, setIncomingEquipment] =
    useState<EquipmentState | null>(null);
  const [question, setQuestion] = useState<string[] | null>(null);
  const [choices, setChoices] = useState<option[] | null>(null);

  const [statChange, setStatChange] = useState<string[] | null>(null);
  const [statusResult, setStatusResult] = useState<string[] | null>(null);

  //DICE
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice

  const handleChoiceSelect = (choiceId: string) => {
    socket.emit("adventure_choice", { stage, choiceId });
    setChoices(null);
  };

  socket.on("adventure_win", (stage) => {
    FlowRouter.go("/adventure/win");
  });

  useEffect(() => {
    console.log("playerState updated:", playerState);
  }, [playerState]);

  useEffect(() => {
    console.log("BATTLE STATE UPDATED");
    if (battleState !== null) {
      setPlayerState(battleState.yourPlayer);
    }
  }, [battleState]);

  useEffect(() => {
    socket.emit("adventure_request", { stage }); //TODO: WHO IS THIS, WHY IS SHE HERE?

    socket.on("adventure_state", (state) => {
      if (state.stage) {
        setStage(state.stage);
      } else {
        console.log("stage", stage);
        // setStage(1000);
      }
      console.log(state.stage);
      if (state.type === "battle") {
        setBattleState(state.battle);
        console.log("STARTING LOGS...", battleState?.yourPlayer.battleLogs);
        setDialogue(null); // Clear dialogue
        setCurrentEnemy(null);
      } else if (state.type === "dialogue") {
        setDialogue(state.dialogue);
        setCurrentEnemy(state.enemy ?? null);
        setBattleState(null); // Clear battle
        setAttackState(state.attack);
        setPlayerState(state.player);
      } else if (state.type === "choice") {
        // Handle choice state
        setChoices(state.choices);
        setQuestion(state.result);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
        setCurrentEnemy(null);
      } else if (state.type === "stat_change") {
        setStatChange(state.result);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
        setCurrentEnemy(null);
      } else if (state.type === "status") {
        console.log("test", state);
        setStatusResult(state.result);
        console.log("test", statusResult);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
        setCurrentEnemy(null);
      } else if (state.type === "update_player") {
        setPlayerState(state.player);
        setEquipmentInventoryFull(false);
        setIncomingEquipment(null);
        setCurrentEquipment([]);
      }
    });

    socket.on("adventure_consumable", (consumableName) => {
      setReceivingConsumable(consumableName.name);
    });

    socket.on("adventure_equipment", (equipmentName) => {
      setReceivingEquipment(equipmentName.name);
    });

    socket.on("adventure_equipment_full", (data) => {
      setCurrentEquipment(data.currentEquipment); // array of 3 equipment that player has
      setIncomingEquipment(data.incomingEquipment); // a new equipment item
      setEquipmentInventoryFull(true);
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      setPossibleActions(actions);
    });

    //insert socket for end of battle

    socket.on("roll_dice", (diceRoll: number) => {
      setDiceValue(diceRoll);
      console.log(`From socket in Battle: dps ${diceRoll}`);
      setShowDiceModal(true);
    });

    return () => {
      socket.off("possible_actions");
      socket.off("adventure_state");
      socket.off("adventure_equipment_full");
    };
  });

  console.log("PLAYER LOGS:", battleState?.yourPlayer.logs); //TODO: remove once log bug is solved

  return (
    <>
      <div
        className="inset-0 w-full h-screen bg-cover bg-center overscroll-contain"
        style={{ backgroundImage: backgroundString }}
      >
        <LeavePopup open={showLeave} onClose={() => setShowLeave(false)} />

        {viewingInfo && (
          <AdventureInfoPopup
            playerState={playerState}
            attackState={attackState}
            onClose={() => setViewingInfo(false)}
          ></AdventureInfoPopup>
        )}
        {viewingEnemyInfo && (
          <AdventureInfoPopup
            playerState={battleState.opponentPlayer}
            attackState={undefined}
            onClose={() => setViewingEnemyInfo(false)}
          ></AdventureInfoPopup>
        )}
        {viewingInventory && (
          <AdventureBagPopup
            playerState={playerState}
            onClose={() => setViewingInventory(false)}
            inBattle={battleState !== null}
          ></AdventureBagPopup>
        )}
        {receivingConsumable && (
          <div>
            {/* <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] z-[10000] pointer-events-auto">
              <IconButton
                style="arrowleft"
                iconColour="black"
                buttonColour="red"
                size="small"
                onClick={() => setShowLeave(true)}
              ></IconButton>
              <LeavePopup
                open={showLeave}
                onClose={() => setShowLeave(false)}
              ></LeavePopup> */}
            {/* </div> */}
            <PopupClean>
              <div className="flex flex-col justify-around items-center">
                <OutlineText size="extraLarge">
                  {receivingConsumable}
                </OutlineText>
                <div className="flex flex-row justify-between gap-x-[3rem] items-center">
                  <ButtonGeneric
                    size="battle"
                    color="blue"
                    onClick={() => {
                      setReceivingConsumable(null);
                      socket.emit("adventure_next", { stage });
                    }}
                  >
                    TAKE!
                  </ButtonGeneric>
                  <ButtonGeneric
                    size="battle"
                    color="red"
                    onClick={() => {
                      setReceivingConsumable(null);
                      socket.emit("adventure_next", { stage });
                    }}
                  >
                    DROP
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          </div>
        )}
        {receivingEquipment &&
          !equipmentInventoryFull &&
          !incomingEquipment && (
            <div>
              <PopupClean>
                <div className="flex flex-col justify-around items-center">
                  <OutlineText size="extraLarge">
                    {receivingEquipment}
                  </OutlineText>
                  <div className="flex flex-row justify-between items-center gap-x-[3rem]">
                    <ButtonGeneric
                      size="battle"
                      color="blue"
                      onClick={() => {
                        setReceivingEquipment(null);
                        socket.emit("adventure_next", { stage });
                      }}
                    >
                      EQUIP!
                    </ButtonGeneric>
                    <ButtonGeneric
                      size="battle"
                      color="red"
                      onClick={() => {
                        setReceivingEquipment(null);
                        socket.emit("adventure_next", { stage });
                      }}
                    >
                      SKIP
                    </ButtonGeneric>
                  </div>
                </div>
              </PopupClean>
            </div>
          )}
        {equipmentInventoryFull && incomingEquipment && (
          <PopupClean>
            <div className="flex flex-col items-center gap-4">
              <OutlineText size="large">YOUR BAG IS TOO HEAVY!</OutlineText>
              <OutlineText size="medium">REMOVE AN ITEM!</OutlineText>
              <div className="grid grid-flow-row h-full w-full auto-rows-auto gap-2 my-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex items-center bg-gray-100 rounded p-2"
                  >
                    <div className="flex-1">
                      {currentEquipment[i] ? (
                        <EquipmentCard
                          equipment={currentEquipment[i]}
                          onClick={() => {}} // Optional: show details if you want
                        />
                      ) : (
                        <span className="text-gray-400">Empty Slot</span>
                      )}
                    </div>
                    {currentEquipment[i] && (
                      <ButtonGeneric
                        color="red"
                        size="small"
                        onClick={() => {
                          setEquipmentInventoryFull(false);
                          setIncomingEquipment(null);
                          setCurrentEquipment([]);
                          setReceivingEquipment(null);
                          socket.emit("adventure_replace_equipment", {
                            removeIndex: i,
                            newEquipment: incomingEquipment,
                          });
                        }}
                      >
                        🗑️
                      </ButtonGeneric>
                    )}
                  </div>
                ))}
                {/* Incoming equipment */}
                <div className="flex items-center bg-yellow-100 rounded p-2">
                  <div className="flex-1">
                    <EquipmentCard
                      equipment={incomingEquipment}
                      onClick={() => {}} // Optional: show details if you want
                    />
                  </div>
                  <ButtonGeneric
                    color="red"
                    size="small"
                    onClick={() => {
                      // Reject the new equipment
                      setEquipmentInventoryFull(false);
                      setIncomingEquipment(null);
                      setCurrentEquipment([]);
                      setReceivingEquipment(null);
                      socket.emit("adventure_next", { stage });
                    }}
                  >
                    🗑️
                  </ButtonGeneric>
                </div>
              </div>
            </div>
          </PopupClean>
        )}
        {dialogue && (
          <>
            {currentEnemy && (
              <MonsterDisplay
                biomeString={getBiomeString(levelMonster)}
                monster={currentEnemy}
              />
            )}
            <DialogueBox
              monster={currentEnemy ?? undefined}
              lines={dialogue}
              onEnd={() => {
                setDialogue(null);
                setCurrentEnemy(null);
                socket.emit("adventure_next", { stage });
              }}
            />
          </>
        )}
        {statChange && (
          <div>
            {/* <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] z-[10000] pointer-events-auto">
              <IconButton
                style="arrowleft"
                iconColour="black"
                buttonColour="red"
                size="small"
                onClick={() => setShowLeave(true)}
              ></IconButton>
              <LeavePopup
                open={showLeave}
                onClose={() => setShowLeave(false)}
              ></LeavePopup>
            </div> */}
            <StatChangePopup
              messages={statChange}
              onClose={() => {
                setStatChange(null);
                socket.emit("adventure_next", { stage });
              }}
            />
          </div>
        )}

        {/**{statusResult && (
          <div>
            <StatChangePopup
              messages={statusResult}
              onClose={() => {
                setStatusResult(null);
                socket.emit("adventure_next", { stage });
              }}
            />
          </div>
        )}*/}

        {statusResult && (
          <div>
            <PopupClean>
              <div className="flex flex-col justify-around items-center">
                <OutlineText size="extraLarge">{statusResult}</OutlineText>
                <div className="flex flex-row justify-between items-center">
                  <ButtonGeneric
                    size="large"
                    color="blue"
                    onClick={() => {
                      setStatusResult(null);
                      socket.emit("adventure_next", { stage });
                    }}
                  >
                    CONFIRM
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          </div>
        )}
        {choices && (
          <>
            {/* {choices.map((choice, idx) => (
            <DialogueChoiceButton
              key={idx}
              children={choice.text}
              onClick={() => handleChoiceSelect(choice.next)}
            />
          ))} */}
            <div>
              {/* <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] z-[10000] pointer-events-auto">
                <IconButton
                  style="arrowleft"
                  iconColour="black"
                  buttonColour="red"
                  size="small"
                  onClick={() => setShowLeave(true)}
                ></IconButton>
                <LeavePopup
                  open={showLeave}
                  onClose={() => setShowLeave(false)}
                ></LeavePopup>
              </div> */}
              <ChoicePopup
                question={question![0]}
                choices={choices}
                onClick={handleChoiceSelect}
              ></ChoicePopup>
            </div>
          </>
        )}
        {/* ADVENTURE HEADER (DURING NON-BATTLE) */}
        {!battleState && playerState && (
          <>
            <div className="fixed top-0 left-0 w-full">
              <div className="flex items-center gap-4 px-[20px]">
                {/* Header */}
                <div className="flex-1">
                  <div className="panel">
                    <AdventureInfoPanel
                      playerState={playerState}
                      level={levelMonster}
                      stage={stage}
                    />
                  </div>
                </div>
                {/* Inventory Button */}
                <div className="py-[12px]">
                  <ButtonGeneric
                    color={"ronchi"}
                    size={"backpack"}
                    onClick={() => setViewingInventory(true)}
                  >
                    <img
                      src={"/assets/backpack.png"}
                      className={"w-[80%] h-[80%] object-contain mx-auto"}
                    ></img>
                  </ButtonGeneric>
                </div>
              </div>
              {/* Exit/Info Buttons */}
              <div className="flex justify-between xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem]  pointer-events-auto">
                <div className="flex lg:gap-5 sm:gap-10">
                  <IconButton
                    style="arrowleft"
                    iconColour="black"
                    buttonColour="red"
                    size="small"
                    onClick={() => setShowLeave(true)}
                  />
                  <IconButton
                    style="info"
                    iconColour="black"
                    buttonColour="blue"
                    size="small"
                    onClick={() => setViewingInfo(true)}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {/* DURING BATTLE UI */}
        {battleState && (
          <div className="battle-state-parts item-center justify-center ">
            <PlayerInfoPanel battleState={battleState} />
            {/* Buttons */}
            <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] pointer-events-auto z-10 w-full flex justify-between">
              {/* Left side buttons */}
              <div className="flex lg:gap-5 sm:gap-10">
                <IconButton
                  style="arrowleft"
                  iconColour="black"
                  buttonColour="red"
                  size="small"
                  onClick={() => setShowLeave(true)}
                />
                <IconButton
                  style="info"
                  iconColour="black"
                  buttonColour="blue"
                  size="small"
                  onClick={() => setViewingInfo(true)}
                />
                <LeavePopup
                  open={showLeave}
                  onClose={() => setShowLeave(false)}
                ></LeavePopup>
              </div>

              {/* Right side buttons */}
              <div className="flex lg:gap-5 sm:gap-10 pr-[2rem]">
                <IconButton
                  style="info"
                  iconColour="black"
                  buttonColour="redpink"
                  size="small"
                  onClick={() => setViewingEnemyInfo(true)}
                />
                <ButtonGeneric
                  color={"ronchi"}
                  size={"squaremedium"}
                  onClick={() => setViewingInventory(true)}
                >
                  <img
                    src={"/assets/backpack.png"}
                    className={"w-[80%] h-[80%] object-contain mx-auto"}
                  ></img>
                </ButtonGeneric>
              </div>
            </div>

            <BattleMonsterPanel
              battleState={battleState}
              slimeString={backgroundLocation}
            />

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

            <div>
              {
                <BattleFooter
                  possibleActions={possibleActions}
                  battleId={battleId}
                />
              }
            </div>

            <DiceRollModal
              show={showDiceModal}
              onClose={() => setShowDiceModal(false)}
              toRoll={diceValue}
              battleState={battleState}
            />
          </div>
        )}
      </div>
    </>
  );
};

const biomeMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => "FOREST"],
  [MonsterIdentifier.POUNCING_BANDIT, () => "FOREST"],
  [MonsterIdentifier.CINDER_TAIL, () => "BASALT"],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => "ARCTIC"],
  [MonsterIdentifier.POISON_POGO, () => "MARSH"],
  [MonsterIdentifier.CHARMER_COBRA, () => "DESERT"],
]);

export function getBiomeString(monsterID: MonsterIdentifier) {
  //default return is forest :)
  const biomeName = biomeMap.get(monsterID);
  return biomeName ? biomeName() : "FOREST";
}

export default AdventureBattle;
