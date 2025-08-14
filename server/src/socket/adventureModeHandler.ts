import { Server, Socket } from "socket.io";
import { activeAdventures, players } from "../../main";
import { Adventure } from "../model/game/adventure";
import { Player } from "../model/game/player";
import { MonsterIdentifier } from "/types/single/monsterState";
import { RockyRhino } from "../model/game/monster/rockyRhino";
import { PouncingBandit } from "../model/game/monster/pouncingBandit";
import { CinderTail } from "../model/game/monster/cinderTail";
import { PoisonFrog } from "../model/game/monster/poisonFrog";
import { FuriousFlipper } from "../model/game/monster/furiousFlipper";
import { CharmerCobra } from "../model/game/monster/charmerCobra";
import { Battle } from "../model/game/battle";
import proceedAdventureTurn from "./proceedAdventureTurn";
import { ActionState } from "/types/single/actionState";
import { loadStage } from "../model/adventure/stageLoader";
import { resolveSubOutcome } from "../model/adventure/storyResolver";

export const adventureModeHandler = (io: Server, socket: Socket) => {
  // Monster selection and adventure start
  socket.on(
    "adventure_monster_selected",
    async ({ monsterID }: { monsterID: MonsterIdentifier }) => {
      const player = new Player(socket.id, "Anika"); // TODO: Use real player name
      const monster = getMonster(monsterID);
      if (!monster) {
        console.error(`Invalid monster name: ${monsterID}`);
        socket.emit("adventure_error", {
          message: "Invalid monster selected.",
        });
        return;
      }
      player.setMonster(monster);
      players.set(socket.id, player);

      // Start adventure at stage 1
      const adventure = new Adventure(player, 1);
      // Track which outcome we're on
      adventure.currentOutcomeIndex = 0;
      activeAdventures.set(socket.id, adventure);

      progressAdventure(io, socket, adventure, 1);
    }
  );

  // Handle next outcome in adventure
  socket.on("adventure_next", async ({ stage }) => {
    const adventure = activeAdventures.get(socket.id);
    if (!adventure) return;

    // Increment outcome index
    if (adventure.currentOutcomeIndex === undefined) {
      adventure.currentOutcomeIndex = 0;
    } else {
      adventure.currentOutcomeIndex++;
    }

    progressAdventure(io, socket, adventure, stage);
  });

  // Handle player actions in adventure
  socket.on(
    "adventure_action",
    ({
      action,
      battleId,
      playerId,
    }: {
      action: ActionState;
      battleId: string;
      playerId: string;
    }) => {
      // TODO: Implement action logic
      console.log("action clicked VIA ADVENTURE WOO!!", action);
      // You would update the battle/adventure state here and emit updates as needed
    }
  );
};
// Helper function to progress adventure outcomes
async function progressAdventure(
  io: Server,
  socket: Socket,
  adventure: Adventure,
  stage: number
) {
  try {
    const stageData = await loadStage(stage);
    const outcomeIndex = adventure.currentOutcomeIndex || 0;
    const outcome = stageData.outcomes[outcomeIndex];

    if (!outcome) {
      // No more outcomes, maybe end the adventure or move to next stage
      socket.emit("adventure_state", {
        type: "dialogue",
        description: "The adventure continues...",
      });
      return;
    }

    const subOutcome = outcome.subOutcomes[0];
    const resolved = resolveSubOutcome(subOutcome);

    if (resolved.type === "FIGHT") {
      // Create bot and battle
      const bot = new Player(
        resolved.enemy!.getId(),
        resolved.enemy?.getName()!
      ); // Eventually use bot class
      bot.setMonster(resolved.enemy!);
      players.set(resolved.enemy!.getId(), bot);

      // Optionally, update adventure state here if needed

      const battle = new Battle(
        crypto.randomUUID(),
        adventure.getPlayer(),
        bot,
        socket.id
      );
      // Send battle state to client
      socket.emit("adventure_state", {
        type: "battle",
        battle: battle.getBattleState(socket.id),
      });
      // Optionally, proceed with the battle logic
      proceedAdventureTurn(io, socket, adventure, battle);
    } else if (resolved.type === "DIALOGUE") {
      // Dialogue or other event
      socket.emit("adventure_state", {
        type: "dialogue",
        dialogue: resolved.result,
      });
    }
  } catch (err) {
    console.error("Adventure stage load error:", err);
    socket.emit("adventure_error", {
      message: "Failed to load adventure stage.",
    });
  }
}

const monsterMap = new Map([
  [MonsterIdentifier.ROCKY_RHINO, () => new RockyRhino()],
  [MonsterIdentifier.POUNCING_BANDIT, () => new PouncingBandit()],
  [MonsterIdentifier.CINDER_TAIL, () => new CinderTail()],
  [MonsterIdentifier.FURIOUS_FLIPPER, () => new FuriousFlipper()],
  [MonsterIdentifier.POISON_FROG, () => new PoisonFrog()],
  [MonsterIdentifier.CHARMER_COBRA, () => new CharmerCobra()],
]);

function getMonster(monsterID: MonsterIdentifier) {
  const createMonster = monsterMap.get(monsterID);
  return createMonster ? createMonster() : null;
}
