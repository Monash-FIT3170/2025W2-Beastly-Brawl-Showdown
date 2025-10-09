import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";
import { Status } from "./status";

export class IncCrit extends StartStatus {
  //TODO: pick a statustype..
  constructor(countdown: number=6) {
      super("Increased Crit Rate", 
        `Your crit rate will be increased by 10%`, 
        countdown, 
        StatusType.BUFF);
        
    }
  
     public startingEffect(player: Player): void {
      player.getMonster()?.incCritRate(10);
      console.log(`${player.getName()}'s crit chance increased by 10%`);
    }
  
    public updateLogs(player: Player): void {
      player.addLog(`Your crit rate is increased by 10%.`);
    }
    public expire(player: Player): void {
      player.getMonster()?.incCritRate(-10);
    }
  }