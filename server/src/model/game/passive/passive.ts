// Let's worry about passive abilities later, after we have the game loop going

export abstract class Passive {
  private name: string;
  private description: string;

  constructor(name: string, description: string) {
    this.name = name;
    this.description = description;
  }
}
