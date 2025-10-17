import { Socket } from "socket.io";
import { adventureModeHandler } from "../../../socket/adventureModeHandler";
import { Adventure } from "../adventure";
import { Player } from "../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";
import socket from "../../../../../client/src/socket";

export class GrandBadge extends StoryItem {
  constructor() {
    super(
      "Grand Badge",
      "A mark proving your victory in the Grand Colosseum",
      "Proof of your ultimate victory!",
      "GRAND_BADGE"
    );
  }
}
