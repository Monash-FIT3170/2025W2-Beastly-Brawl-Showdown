import { Monster } from "./monster/monster";
import { Player } from "./player";
import { storyStruct } from "/types/composite/storyTypes";
import { MonsterIdentifier } from "/types/single/monsterState";

export class Adventure {
  private player: Player;
  private level: number;
  private levelMonster: MonsterIdentifier;
  private stage: number;
  private playerMonster: Monster | null;
  public currentOutcomeId: string | null = "initial";
  public currentStory: storyStruct | null;
  public pastEncounters: string[] = [];

  constructor(player: Player, level: number) {
    this.player = player;
    this.level = level;
    this.levelMonster = MonsterIdentifier.POUNCING_BANDIT; //update to map
    this.stage = 0;
    this.playerMonster = player.getMonster();
    this.currentStory = null;
  }

  //TODO: REMOVE - FOR TESTING
  public getId(): string {
    return this.player.getId();
  }

  public getPlayer(): Player {
    return this.player;
  }

  public getLevel(): number {
    return this.level;
  }

  public getStage(): number {
    return this.stage;
  }

  public incrementStage(): void {
    this.stage += 1;
  }

  public getPlayerMonster(): Monster | null {
    return this.playerMonster;
  }
}
