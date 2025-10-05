import { SlimeBaby } from "../../game/storyItem/slimeBaby";
import { StoryItem } from "../../game/storyItem/storyItem";
import { EverbloomingLotus } from "../../game/storyItem/everbloomingLotus";
import { DragonScale } from "../../game/storyItem/dragonScale";

const StoryItemFactory: Record<string, () => StoryItem> = {
  slime_baby: () => new SlimeBaby(),
  everblooming_lotus: () => new EverbloomingLotus(),
  dragon_scale: () => new DragonScale(),
};

export function createStoryItem(id: string): StoryItem {
  const creator = StoryItemFactory[id];
  console.log(creator, "THIS IS THE CREATOR"); //??lol?
  if (!creator) {
    throw new Error(`Unknown Story Item ID: ${id}`);
  }
  return creator();
}
