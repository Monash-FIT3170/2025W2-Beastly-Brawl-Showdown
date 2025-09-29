import { FlameLashAbilityAction } from "../action/ability/flameLash";
import { Player } from "../player";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class CinderFlame extends Consumable {
  private damage = 5;
  constructor() {
    // "Whip your blazing tail for 5 damage. If your foe tries to dodge, the flames bend and strike again for another 5 damage."
    super(
      "Cinder Flame",
      "This forever burning fire seems reminiscent of the flame upon a Cinder Tail's tail.",
      ConsumableType.ENEMY_INFLICT
    );
  }
  public getStatDescription(): string {
    return "Deal 5 damage, double damage if dodging.";
  }
  public consume(player: Player): void {
    const action = new FlameLashAbilityAction();

    // Deal 10 damage if the opponent is dodging, 5 damage otherwise
    if (player.getArmourClassStat() >= 50) {
      //TODO FIGURE OUT A BALANCED AC
      this.damage = 10;
    }

    //to remove once dodge is reworked?
    if (player.getDodgingPosition()) {
      this.damage = 10;
    }

    player.incHealth(-this.damage);
    // Log the action ??
  }

  protected getImageString(): string {
    return "CINDER_FLAME";
  }
}
