import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";
import {Player} from "server/src/model/game/player"
import { RockyRhino } from "./monster/rockyRhino";
import { AttackAction } from "./action/attack";
import { Battle } from "../../model/game/battle";

export class BotPlayer extends Player {
  private static nameList = [
    "Big Bum Loser",
    "Chimp on a typewriter",
    "George",
    "Brain in a jar",
    "Very intelligent fetus"
  ];

  private static getRandomName(): string {
    const index = Math.floor(Math.random() * BotPlayer.nameList.length);
    return BotPlayer.nameList[index];
  }

  constructor() {
    const randomName = BotPlayer.getRandomName();
    super("placeholder",randomName);
  }
  // Called by battle handler to let the bot choose an action
  public decideAction(battle: Battle, opponent: Player): void {

    const possibleActions = this.getMonster().getPossibleActionStates();

    // Choose first available attack (or random)
    const attack = possibleActions.find(action => action.getName() === "Attack");

    if (attack) {
      // Instantiate a real AttackAction targeting the opponent
      const selectedAction = new AttackAction();
      this.addAction(selectedAction);
    } else {
      // Fallback to null action
      this.addAction(new NullAction());
    }
  }
} 
