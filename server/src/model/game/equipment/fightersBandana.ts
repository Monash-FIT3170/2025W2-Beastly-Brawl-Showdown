import { Player } from "../player";
import { Equipment } from "./equipment";

export class FightersBandana extends Equipment {
  constructor() {
    super(
      "Fighters Bandana",
      "Allows the user to hone their focus, increasing their critical hit rate."
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    const attack = player.getMonster()?.getAttackAction();
    attack?.incrementCritRate(this.strength);
  }

  public unequip(player: Player): void {
    const attack = player.getMonster()?.getAttackAction();
    attack?.incrementCritRate(-this.strength);
  }

  public getStatDescription(): string {
    return "+" + this.strength + "% Critical Hit Rate";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "FIGHTERS_BANDANA";
  }
}
