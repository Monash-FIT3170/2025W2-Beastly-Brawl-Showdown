import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { EndStatus } from "./endStatus";
import { Status } from "./status";

export class SwampsCalm extends EndStatus {
  //TODO: pick a statustype..
  constructor(countdown: number=6) {
      super("Swamps Calm", 
        "A gentle stillness from the swamp's magic that slowly heals your wounds.", 
        countdown, 
        StatusType.BUFF);
    }
  
    public endingEffect(player: Player): void {
      player.incHealth(2);
      console.log(`${player.getName()} is heald by 2HP`);
      // player.addLog(`You have been poisoned, -1 HP.`)
    }
  
    public updateLogs(player: Player): void {
      player.addLog(`The swamp quietly heald you by 2 HP.`);
    }
    public expire(): void {
      
    }
  }
  