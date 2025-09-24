import { Player } from "../player";
import { Burn } from "../status/burn";
import { Consumable } from "./consumable";
import { ConsumableType } from "/types/single/itemState";

export class CharredRoot extends Consumable {
  constructor() {
    //btw feel free to change descriptions this is just for now
    const description =
      "A twisted root blackened by fire but still alive with warmth. When chewed it soothes burns and restores your health.";
    super("Charred Root", description, ConsumableType.SELF_INFLICT);
  }

  public consume(player: Player): void {
    console.error("TEST CHARRED ROOT");
    const healAmount = Math.ceil(player.getMonster()!.getMaxHealth() * 0.4);
    player.incHealth(healAmount);
    const statuses = player.getStatuses().filter((s) => s! instanceof Burn);
    player.clearStatuses();
    statuses.forEach((s) => player.addStatus(s));
    player.addLog(
      `You chew down on the root, healing any burns and restoring ${healAmount}HP.`
    );
  }

  public getStatDescription(): string {
    return "Heal 40% of your HP and remove any Burns.";
  }

  protected getImageString(): string {
    return "CHARRED_ROOT";
  }
}
