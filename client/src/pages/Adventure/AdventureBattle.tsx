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
import { ActionIdentifier, ActionState } from "/types/single/actionState";
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

interface AdventureProps {
  //so i am adding this without actually knowing why just trust the process
  stage: number;
}

const AdventureBattle: React.FC<AdventureProps> = ({ stage }) => {
  //TODO: determine enemy in here???? maybe from AdventureProps
  const [dialogue, setDialogue] = useState<string[] | null>(null);
  const [battleState, setBattleState] = useState<BattleState | null>(null);
  const [showDiceModal, setShowDiceModal] = useState(false); // show dice modal | TODO: For future, use action animation ID instead of boolean to trigger animations
  const [diceValue, setDiceValue] = useState<number>(0); // result of dice
  const [question, setQuestion] = useState<string[] | null>(null);
  const [choices, setChoices] = useState<option[] | null>(null);
  const [statChange, setStatChange] = useState<string[] | null>(null);
  const [receivingConsumable, setReceivingConsumable] = useState<string | null>(
    null
  );
  const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const [currentEnemy, setCurrentEnemy] = useState<MonsterState | null>(null);
  const [receivingEquipment, setReceivingEquipment] = useState<string | null>(
    null
  );
  const [viewingInventory, setViewingInventory] = useState<Boolean>(false);
  const [viewingInfo, setViewingInfo] = useState<Boolean>(false);
  const [statusResult, setStatusResult] = useState<string[] | null>(null);
  const battleId = "ADVENTURE";
  //TODO: set player state
  const [playerState, setPlayerState] = useState<PlayerState | null>();

  const handleChoiceSelect = (choiceId: string) => {
    socket.emit("adventure_choice", { stage, choiceId });
    setChoices(null);
  };

  const [showLeave, setShowLeave] = useState(false);

  socket.on("adventure_win", (stage) => {
    FlowRouter.go("/adventure/win");
  });

  console.log(battleState?.yourPlayer.logs); //TODO: remove once log bug is solved

  useEffect(() => {
    socket.emit("adventure_request", { stage });

    socket.on("adventure_state", (state) => {
      if (state.type === "battle") {
        setBattleState(state.battle);
        console.log("STARTING LOGS...", battleState?.yourPlayer.battleLogs);
        setDialogue(null); // Clear dialogue
        setCurrentEnemy(null);
      } else if (state.type === "dialogue") {
        setDialogue(state.dialogue);
        setCurrentEnemy(state.enemy ?? null);
        setBattleState(null); // Clear battle
        setPlayerState(state.player);
      } else if (state.type === "choice") {
        // Handle choice state
        setChoices(state.choices);
        setQuestion(state.result);
        setBattleState(null); // Clear battle
        setCurrentEnemy(null);
      } else if (state.type === "stat_change") {
        setStatChange(state.result);
        setBattleState(null); // Clear battle
        setCurrentEnemy(null);
      } else if (state.type === "status") {
        setStatusResult(state.result);
        setBattleState(null); // Clear battle
        setCurrentEnemy(null);
      }
    });

    socket.on("adventure_consumable", (consumableName) => {
      setReceivingConsumable(consumableName.name);
    });

    socket.on("adventure_equipment", (equipmentName) => {
      setReceivingEquipment(equipmentName.name);
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
    };
  }, [stage]);

  var backgroundLocation = "FOREST"; //TODO: change this to be based off level/monster?
  var backgroundString =
    "url('/assets/backgrounds/" + backgroundLocation + ".jpg')";

  //TODO: add inventory button
  return (
    <>
      <div
        className="inset-0 w-full h-screen bg-cover bg-center overscroll-contain"
        style={{ backgroundImage: backgroundString }}
      >
        {viewingInfo && (
          <AdventureInfoPopup
            playerState={playerState}
            onClose={() => setViewingInfo(false)}
          ></AdventureInfoPopup>
        )}
        {viewingInventory && (
          <AdventureBagPopup
            playerState={playerState}
            onClose={() => setViewingInventory(false)}
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
                <div className="flex flex-row justify-between items-center">
                  <ButtonGeneric
                    size="large"
                    color="blue"
                    onClick={() => {
                      setReceivingConsumable(null);
                      socket.emit("adventure_next", { stage });
                    }}
                  >
                    TAKE!
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          </div>
        )}
        {receivingEquipment && (
          <div>
            <PopupClean>
              <div className="flex flex-col justify-around items-center">
                <OutlineText size="extraLarge">
                  {receivingEquipment}
                </OutlineText>
                <div className="flex flex-row justify-between items-center">
                  <ButtonGeneric
                    size="large"
                    color="blue"
                    onClick={() => {
                      setReceivingEquipment(null);
                      socket.emit("adventure_next", { stage });
                    }}
                  >
                    EQUIP!
                  </ButtonGeneric>
                </div>
              </div>
            </PopupClean>
          </div>
        )}
        {dialogue && (
          <>
            {currentEnemy && <MonsterDisplay monster={currentEnemy} />}
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
        {statusResult && (
          <div>
            <StatChangePopup
              messages={statusResult}
              onClose={() => {
                setStatusResult(null);
                socket.emit("adventure_next", { stage });
              }}
            />
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
        {!battleState && playerState && (
          <>
            <AdventureInfoPanel playerState={playerState} />
            <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] z-[10000] pointer-events-auto">
              <IconButton
                style="arrowleft"
                iconColour="black"
                buttonColour="red"
                size="small"
                onClick={() => setShowLeave(true)}
              />
              <LeavePopup
                open={showLeave}
                onClose={() => setShowLeave(false)}
              />
              <ButtonGeneric
                color={"ronchi"}
                size={"tiny"}
                onClick={() => setViewingInventory(true)}
              >
                INVENTORY
              </ButtonGeneric>
              <ButtonGeneric
                color={"blue"}
                size={"tiny"}
                onClick={() => setViewingInfo(true)}
              >
                INFO
              </ButtonGeneric>
            </div>
            {/* INSERT INVENTORY */}
          </>
        )}
        {battleState && (
          <div className="battle-state-parts item-center justify-center ">
            <PlayerInfoPanel battleState={battleState} />
            <div className="xl:pt-[2rem] xl:pl-[2rem] pt-[3rem] fixed pl-[3rem] z-[10000] pointer-events-auto">
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
            </div>
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

export default AdventureBattle;
