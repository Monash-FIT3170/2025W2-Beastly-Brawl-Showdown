import { Player } from "../player";
import { TitanSlayer } from "../status/titanSlayer";
import { Equipment } from "./equipment";

export class MeekHelmet extends Equipment {
  titanSlayer = new TitanSlayer(Infinity);
  constructor() {
    super(
      "Meek Helmet",
      "A plain helmet. Holding it makes you feel unstoppable."
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    player.addStatus(this.titanSlayer);
  }

  public unequip(player: Player): void {
    player.removeStatus(this.titanSlayer);
  }

  public getStatDescription(): string {
    return "Attacks to foes with greater health deal double damage.";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "MEEK_HELMET";
  }
}
