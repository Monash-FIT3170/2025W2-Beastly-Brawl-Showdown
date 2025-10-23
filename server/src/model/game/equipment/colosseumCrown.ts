import { Player } from "../player";
import { AfflictionTouch } from "../status/afflictionTouch";
import { Regeneration } from "../status/regeneration";
import { TitanSlayer } from "../status/titanSlayer";
import { Equipment } from "./equipment";

export class ColosseumCrown extends Equipment {
  afflictionTouch = new AfflictionTouch();
  regeneration = new Regeneration();
  titanSlayer = new TitanSlayer();
  constructor() {
    super("Colosseum Crown", "A gleaming gold crown overflowing with power.");
  }

  public equip(player: Player): void {
    //TODO: implement
    player.addStatus(this.afflictionTouch);
    player.addStatus(this.regeneration);
    player.addStatus(this.titanSlayer);
  }

  public unequip(player: Player): void {
    player.removeStatus(this.afflictionTouch);
    player.removeStatus(this.regeneration);
    player.removeStatus(this.titanSlayer);
  }

  public getStatDescription(): string {
    return "Gain the abilities of all prior colosseum rewards.";
  }

  public calculateStrength(stage: number): void {
    //TODO: update formula - currently strength = stage
    this.strength = stage;
  }

  protected getImageString(): string {
    return "COLOSSEUM_CROWN";
  }
}
