import { Socket } from "socket.io";
import { adventureModeHandler } from "../../../socket/adventureModeHandler";
import { Adventure } from "../adventure";
import { Player } from "../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";
import socket from "../../../../../client/src/socket";

export class TitanicBadge extends StoryItem {
  constructor() {
    super(
      "Titanic Badge",
      "A mark proving your victory in the Colosseum of Titans.",
      "1/3 of your entry into the Grand Colosseum.",
      "TITANIC_BADGE"
    );
  }
}
