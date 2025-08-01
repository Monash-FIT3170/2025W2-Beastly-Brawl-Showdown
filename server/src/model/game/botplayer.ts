import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";
import {Player} from "server/src/model/game/player"
import { RockyRhino } from "./monster/rockyRhino";

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
}