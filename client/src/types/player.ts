export default class Player {
    public userID: string;
    public name: string;

    constructor(userID: string, name: string) {
        this.userID = userID;
        this.name = name;
      
    }

    public getId(): string {
    return this.userID;
  }

}