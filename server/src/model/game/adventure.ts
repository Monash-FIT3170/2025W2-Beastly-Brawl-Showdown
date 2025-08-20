import { Monster } from "./monster/monster";
import { getBiomeString } from "./monster/monsterMap";
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
  public currentBackground: string | null = "FOREST";
  public currentStory: storyStruct | null;

  constructor(player: Player, level: number) {
    this.player = player;
    this.level = level;
    this.levelMonster = MonsterIdentifier.POUNCING_BANDIT; //update to map
    this.currentBackground == getBiomeString(this.levelMonster);
    this.stage = 0;
    this.playerMonster = player.getMonster();
    this.currentStory = null;
  }

  public updateBackground(){
    this.currentBackground == getBiomeString(this.levelMonster);
  }

  public getCurrentBackground(){
    return this.currentBackground;
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
