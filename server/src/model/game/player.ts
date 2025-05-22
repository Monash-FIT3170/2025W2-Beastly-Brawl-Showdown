// Reference: https://github.com/Monash-FIT3170/Shazam-3-Scrum-Unleashed/blob/dev/server/src/model/player.ts

export default class Player {
  // UPDATE: make additional private attributes and get functions

  public userID: string;
  public name: string;
  public score: number;
  public currentGameCode: number;

  constructor(userID: string, name: string) {
    this.userID = userID;
    this.name = name;
    this.score = 0;
    this.currentGameCode = 0;
  }

  public getGameCode() {
    return this.currentGameCode;
  }

  public updateGameCode(newCode: number) {
    this.currentGameCode = newCode;
  }
}
