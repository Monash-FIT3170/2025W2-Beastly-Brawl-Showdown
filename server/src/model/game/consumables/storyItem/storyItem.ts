import { Adventure } from "../../adventure";
import { Consumable } from "../consumable";

export abstract class StoryItem extends Consumable {
  protected nextId: string;
  protected adventure: Adventure;

  constructor(name: string, description: string, type: string, nextId: string) {
    super(name, description, type);
    this.nextId = nextId;
  }

  public setAdventure(adventure: Adventure) {
    this.adventure = adventure;
  }
}
