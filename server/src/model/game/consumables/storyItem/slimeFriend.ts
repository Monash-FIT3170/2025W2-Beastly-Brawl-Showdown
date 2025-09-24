import { Socket } from "socket.io";
import { adventureModeHandler } from "../../../../socket/adventureModeHandler";
import { Adventure } from "../../adventure";
import { Player } from "../../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";
import socket from "../../../../../../client/src/socket";

export class SlimeFriend extends StoryItem {
  constructor() {
    super(
      "Slime Friend",
      "A green friend you met on your travels, release him at the right time and maybe it will be of utmost help.",
      ConsumableType.ENEMY_INFLICT,
      "reunion_bridge"
    );
  }

  public getStatDescription(): string {
    return "???";
  }

  public getImageString(): string {
    return "SLIME";
  }

  public consume(player: Player): void {
    if (this.adventure.currentOutcomeId == "fight_grandma") {
      this.adventure.currentOutcomeId = this.nextId;
      player.setHealth(0);
    } else {
      player.addLog(
        "You took the slime out of your bag and it ran away in fear.."
      );
    }
  }
}
