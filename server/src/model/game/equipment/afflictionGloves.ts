import { Player } from "../player";
import { AfflictionTouch } from "../status/afflictionTouch";
import { BattleRage } from "../status/battleRage";
import { Equipment } from "./equipment";

export class AfflictionGloves extends Equipment {
  afflictionTouch = new AfflictionTouch(Infinity);
  constructor() {
    super(
      "Affliction Gloves",
      "A shiny set of gloves, that seam to glimmer different shades of green and red."
    );
  }

  public equip(player: Player): void {
    //TODO: implement
    player.addStatus(this.afflictionTouch);
  }

  public unequip(player: Player): void {
    player.removeStatus(this.afflictionTouch);
  }

  public getStatDescription(): string {
    return "Attacks have a chance to inflict poison, burn or curse.";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "AFFLICTION_GLOVES";
  }
}
