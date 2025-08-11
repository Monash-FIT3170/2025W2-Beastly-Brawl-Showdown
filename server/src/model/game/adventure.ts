import { Monster } from "./monster/monster";
import { Player } from "./player";
import { MonsterIdentifier } from "/types/single/monsterState";

export class Adventure {
  private player: Player;
  private level: number;
  private levelMonster: MonsterIdentifier;
  private stage: number;
  private playerMonster: Monster | null;

  constructor(player: Player, level: number) {
    this.player = player;
    this.level = level;
    this.levelMonster = MonsterIdentifier.POUNCING_BANDIT; //update to map
    this.stage = 1;
    this.playerMonster = player.getMonster();
  }

  //TODO: REMOVE - FOR TESTING
  public getId(): string {
    return this.player.getId();
  }
}
