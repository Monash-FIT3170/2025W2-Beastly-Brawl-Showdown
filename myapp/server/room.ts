import { User } from "./user";

export class Room {
  private room_id: string;
  private users: Map<string, User> = new Map();

  constructor(room_id: string) {
    this.room_id = room_id;
  }

  public getRoomId(): string {
    return this.room_id;
  }

  public getUser(socket_id: string): User | undefined {
    return this.users.get(socket_id);
  }

  public addUser(user: User): void {
    this.users.set(user.getSocketId(), user);
  }

  public removeUser(socket_id: string): void {
    this.users.delete(socket_id);
  }
}
