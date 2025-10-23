import { Player } from "../player";
import { Regeneration } from "../status/regeneration";
import { Equipment } from "./equipment";

export class RegenerationAmulet extends Equipment {
  regeneration = new Regeneration(Infinity);
  constructor() {
    super(
      "Regeneration Amulet",
      "A golden amulet with traces of healing magic"
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    player.addStatus(this.regeneration);
  }

  public unequip(player: Player): void {
    player.removeStatus(this.regeneration);
  }

  public getStatDescription(): string {
    return "Restore 1 health at the end of each turn.";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "REGENERATION_AMULET";
  }
}
