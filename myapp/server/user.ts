export class User {
  private socket_id: string;
  private name: string;

  constructor(socket_id: string, name: string) {
    this.socket_id = socket_id;
    this.name = name;
  }

  public getSocketId(): string {
    return this.socket_id;
  }

  public getName(): string {
    return this.name;
  }
}
