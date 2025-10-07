import { Socket } from "socket.io";
import { adventureModeHandler } from "../../../socket/adventureModeHandler";
import { Adventure } from "../adventure";
import { Player } from "../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";
import socket from "../../../../../client/src/socket";

export class SlimeBaby extends StoryItem {
  constructor() {
    super(
      "Slime Baby",
      "A green friend you met on your travels",
      "It seems lonely",
      "SLIME"
    );
  }
}
