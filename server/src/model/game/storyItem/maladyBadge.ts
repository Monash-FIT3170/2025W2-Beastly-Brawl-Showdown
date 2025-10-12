import { Socket } from "socket.io";
import { adventureModeHandler } from "../../../socket/adventureModeHandler";
import { Adventure } from "../adventure";
import { Player } from "../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";
import socket from "../../../../../client/src/socket";

export class MaladyBadge extends StoryItem {
  constructor() {
    super(
      "Malady Badge",
      "A mark proving your victory in the Colosseum of Maladies.",
      "1/3 of your entry into the Grand Colosseum.",
      "MALADY_BADGE"
    );
  }
}
