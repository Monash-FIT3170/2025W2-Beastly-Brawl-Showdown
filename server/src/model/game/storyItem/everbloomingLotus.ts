import { adventureModeHandler } from "../../../socket/adventureModeHandler";
import { Adventure } from "../adventure";
import { Player } from "../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";

export class EverbloomingLotus extends StoryItem {
  constructor() {
    super(
      "Everblooming Lotus",
      "A lotus that never wilts. It's magic sometimes blesses those who consume it with vitality, other times leaving only silence..",
      ConsumableType.SELF_INFLICT,
      "witch_lotus_bridge"
    );
  }

  public getStatDescription(): string {
    return "???";
  }

  public getImageString(): string {
    return "EVERBLOOMING_LOTUS";
  }

  // public consume(player: Player): void {
  //   if (this.adventure.currentOutcomeId == "witch_encounter_2") {
  //     this.adventure.currentOutcomeId = this.nextId;
  //     player.setHealth(0);
  //   } else {
  //     const chance = Math.random();
  //     if (chance < 0.1) {
  //       const healthIncrease = Math.ceil(
  //         player.getMonster()!.getMaxHealth() * 1.1
  //       );
  //       player.getMonster()?.incMaxHealth(healthIncrease);
  //       player.addLog(
  //         "The lotus melts on your tongue as you feel your body stronger than before. Your max HP increased by 10%."
  //       );
  //     } else {
  //       player.addLog(
  //         "You swallow the lotus. The lotus melts on your tongue... and nothing happens."
  //       );
  //     }
  //   }
  // }
}
