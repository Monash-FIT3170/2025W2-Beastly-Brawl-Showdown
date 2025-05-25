export default class Player {
  public userID: string;
  public name: string;
  public monsterCode: string;
  constructor(userID: string, name: string, monsterCode: string) {
    this.userID = userID;
    this.name = name;
    this.monsterCode = monsterCode;
  }

  public getId(): string {
    return this.userID;
  }
}
