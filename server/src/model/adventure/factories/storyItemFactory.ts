import { SlimeBaby } from "../../game/storyItem/slimeBaby";
import { StoryItem } from "../../game/storyItem/storyItem";
import { EverbloomingLotus } from "../../game/storyItem/everbloomingLotus";

const StoryItemFactory: Record<string, () => StoryItem> = {
  slime_baby: () => new SlimeBaby(),
  everblooming_lotus: () => new EverbloomingLotus(),
};

export function createStoryItem(id: string): StoryItem {
  const creator = StoryItemFactory[id];
  console.log(creator, "THIS IS THE CREATOR");
  if (!creator) {
    throw new Error(`Unknown Story Item ID: ${id}`);
  }
  return creator();
}
