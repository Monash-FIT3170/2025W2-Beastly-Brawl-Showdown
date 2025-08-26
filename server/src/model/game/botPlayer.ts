import { Player } from "./player";


export class BotPlayer extends Player {
  private static nameList = [
    "Big Bum Loser",
    "Chimp on a typewriter",
    "George",
    "Brain in a jar",
    "Very intelligent fetus"
  ];

  private static getRandomName(): string {
    const index = Math.floor(Math.random() * BotPlayer.nameList.length);
    return BotPlayer.nameList[index];
  }

  constructor(name: string) {
    var botName = "";
    if(name == ""){
      var botName = botName = BotPlayer.getRandomName();;
    }
    else{
      var botName = name;
    }

    
    super("placeholder",botName,true);
  }
}
