import { Monster } from "./monster/monster";
import { Action } from "./action/action";
import { PlayerState } from "/types/single/playerState";
import {Player} from "server/src/model/game/player"
import { RockyRhino } from "./monster/rockyRhino";

export class botplayer extends Player{
  constructor() {
    super("placeHolder", "Big Bum Loser")
  }
  
}