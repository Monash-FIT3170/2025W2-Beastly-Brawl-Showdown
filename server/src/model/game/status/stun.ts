import { Player } from "../player";
import { Status } from "./status";

export class Stun extends Status {
  constructor() {
    super("Stun", "Monster is unable to attack");
  }


  //TODO: implement stun
  public effect(player: Player): void {
    //INPUT: PLAYER    

    //for player -> make stunned lol
    //IDEALLY:
    //grey out moves / make buttons unclickable, forcing them to do nothing

    // the end


    //IM THINKING WE DO THIS TOMORROW.. BUT THIS IS JUST A better WAY FOR THE PLAYER TO UNDERSTAND THEYRE STUNNED 
    // RATHER THAN JUST TAKING AWAY THE MOVE THEY THINK THEY DID

    //I THINK THAT GREYING OUT WILL BE A LOT OF DEBUGGGING AND MESSING AROUND.. if you can do it i believe but
    //atleast other states (purely poison) will be simpler

    //if its in the button.. lets put this in the button
    //fight fire with fire

    //player.damage++++
    //erm i tried closing this and it said save now im scared
    //..........................................
    
    console.log(`${player.getName()} has been stunned!`);

  }
}
