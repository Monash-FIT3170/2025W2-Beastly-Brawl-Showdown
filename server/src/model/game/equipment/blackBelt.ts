import { Player } from "../player";
import { BattleRage } from "../status/battleRage";
import { Equipment } from "./equipment";

export class BlackBelt extends Equipment {
  battleRage = new BattleRage(Infinity);
  constructor() {
    super(
      "Black Belt",
      "Consecutive attack actions increase damage dealt in battle."
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    player.addStatus(this.battleRage);
  }

  public unequip(player: Player): void {
    this.battleRage.endOfBattle(player);
    player.removeStatus(this.battleRage);
  }

  public getStatDescription(): string {
    return "Consecutive attacks deal more damage.";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "BLACK_BELT";
  }
}
