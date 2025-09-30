import { AttackAction } from "../action/attack";
import { Player } from "../player";
import { Equipment } from "./equipment";

export class PufferPrickle extends Equipment {
  constructor() {
    super(
      "Puffer Prickle",
      "Let enemies feel the wrath of a once furious pufferfish.."
    );
  }

  public equip(player: Player): void {
    player.getMonster()?.getAttackAction().incrementCritRate(this.strength);
  }
  public unequip(player: Player): void {
    player.getMonster()?.getAttackAction().incrementCritRate(-this.strength);
  }
  public getStatDescription(): string {
    return "+" + this.strength + "% Critical Hit Chance";
  }

  public calculateStrength(stage: number): void {
    this.strength = Math.min(stage * 3, 50);
  }

  protected getImageString(): string {
    return "PUFFER_PRICKLE";
  }
}
