import { StoryItemState } from "/types/single/itemState";

export abstract class StoryItem {
  protected name: string;
  protected description: string;
  protected hintDescription: string;
  protected imageString: string;

  constructor(
    name: string,
    description: string,
    hintDescription: string,
    imageString: string
  ) {
    this.name = name;
    this.description = description;
    this.hintDescription = hintDescription;
    this.imageString = imageString;
  }

  public getName(): string {
    return this.name;
  }

  public getDescription(): string {
    return this.description;
  }

  public getHintDescription(): string {
    return this.hintDescription;
  }

  public getImageString(): string {
    return this.imageString;
  }

  public getState(): StoryItemState {
    return {
      name: this.name,
      description: this.description,
      hintDescription: this.hintDescription,
      imageString: this.imageString,
    };
  }
}
