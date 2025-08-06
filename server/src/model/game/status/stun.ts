import { Player } from "../player";
import { Status } from "./status";

export class Stun extends Status {
  constructor() {
    super("Stun", "Monster is unable to attack");
  }

  //do this tonight:
  //then in startBattle handler, loop through statuses, for each status,, status.tick(player);
  //this will happen start of each turn

  //do basic turn ticking...
  //update GROUND SLAM to utilise stun
  


  //then split poison and stun to do tmrw???
  //am i tired.. yes...

  public tick(player: Player): void {
    //INPUT: PLAYER    

    //for player -> make stunned lol
    //IDEALLY:
    //grey out moves / make buttons unclickable, forcing them to do nothing

    // the end


    //player.damage++++

    if(this.countDown === 0){
      
    }

  }
}
