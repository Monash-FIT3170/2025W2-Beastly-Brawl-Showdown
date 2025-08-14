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
  // const [possibleActions, setPossibleActions] = useState<ActionState[]>([]);
  const battleId = "ADVENTURE";

  useEffect(() => {
    socket.emit("adventure_request", { stage });

    socket.on("adventure_state", (state) => {
      if (state.type === "battle") {
        setBattleState(state.battle);
        setDialogue(null); // Clear dialogue
      } else if (state.type === "dialogue") {
        setDialogue(state.dialogue);
        setBattleState(null); // Clear battle
      }
    });

    socket.on("possible_actions", (actions: ActionState[]) => {
      // setPossibleActions(actions);
    });

    //insert socket for end of battle

    // TODO: For future, this should handle socket message 'handle_animation' and pass in an animation identifier
    // to handle all types of animations triggered by actions
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

  var fakeAction = {
    id: ActionIdentifier.ATTACK,
    name: "attack",
    description: "pp",
    currentUse: 100,
    maxUse: 100,
  };
  const possibleActions = [fakeAction];

  var tempMonsterState = {
    id: MonsterIdentifier.CINDER_TAIL,
    archetypeId: ArchetypeIdentifier.BALANCED,
    name: "Slime",
    description: "",

    maxHealth: 10,
    attackBonus: 0,
    armourClass: 8,

    possibleActions: [fakeAction, fakeAction, fakeAction, fakeAction],
  };

  var tempPlayerState = {
    id: "1",
    name: "anik1a",

    currentHealth: 10,
    currentAttackStat: 0,
    currentArmourClassStat: 8,
    // initialHealth: number;
    // monsterName: string;
    successBlock: 0,
    successHit: 0,

    statuses: [],

    monster: tempMonsterState,

    logs: [],
    battleLogs: [],
  };

  // const battleState = {
  //   id: "vlPF5IeotxAllOzwAAAN",
  //   turn: 1,
  //   yourPlayer: tempPlayerState,
  //   yourPlayerMonster: tempMonsterState,
  //   opponentPlayer: tempPlayerState,
  //   opponentPlayerMonster: tempMonsterState,
  //   isOver: false,
  // };

  //TODO: add exit button
  //TODO: add inventory button
  //TODO: add background (based off level)
  //TODO: add status icons
  //TODO: add link to next *whatever* after winning
  //TODO: add link to defeat page if dead + end adventure
  //TODO: update socket info to connect and update
  //TODO: take player's monster
  return (
    <>
      {dialogue && (
        <DialogueBox
          monster={tempMonsterState}
          lines={dialogue}
          onEnd={() => {
            setDialogue(null);
            socket.emit("adventure_next", { stage });
          }}
        />
      )}
      {battleState && (
        <div className="battle-state-parts item-center justify-center ">
          <PlayerInfoPanel battleState={battleState} />

          <BattleMonsterPanel battleState={battleState} />

          <div
            className="battle-logs-stack mt-[60%] xl:mt-[15%]"
            style={{ position: "relative", width: "100%", height: "120px" }}
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
    </>
  );
};

export default AdventureBattle;
