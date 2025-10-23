import { Socket } from "socket.io";
import { adventureModeHandler } from "../../../socket/adventureModeHandler";
import { Adventure } from "../adventure";
import { Player } from "../player";
import { StoryItem } from "./storyItem";
import { ConsumableType } from "/types/single/itemState";
import socket from "../../../../../client/src/socket";

export class PristineKey extends StoryItem {
  constructor() {
    super(
      "Pristine Key",
      "A gleaming key that looks like it would fall apart on use.",
      "Can be used to open a Pristine Lock.",
      "PRISTINE_KEY"
    );
  }
}
