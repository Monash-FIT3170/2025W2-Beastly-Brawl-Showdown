import { CinderTail } from "./monster/cinderTail";
import { PouncingBandit } from "./monster/pouncingBandit";
import { RockyRhino } from "./monster/rockyRhino";
import { Player } from "./player";
import { monsterMap } from "./monster/monsterMap";

export class BotPlayer extends Player {
  private static nameList = [
    "Big Bum Loser",
    "Chimp on a typewriter",
    "George",
    "Brain in a jar",
    "Very intelligent fetus",
  ];

  private static getRandomName(): string {
    const index = Math.floor(Math.random() * BotPlayer.nameList.length);
    return BotPlayer.nameList[index];
  }

  constructor(name?: string) {
    var botName = name ?? BotPlayer.getRandomName();
    

    super("placeholder", botName, null ,true); //TODO: give proper id??? - i guess id is never used properly??? - adding a TODO in case...
  }

  public setRandomMonster(): void {
    const monsters = Array.from(monsterMap.values());

    const randomMonsterFactory =
      monsters[Math.floor(Math.random() * monsters.length)];

    const monster = randomMonsterFactory();

    this.setMonster(monster);
  }
}
