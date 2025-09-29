import { MoltenHeart } from "../../game/storyItem/moltenHeart";
import { SlimeBaby } from "../../game/storyItem/slimeBaby";
import { StoryItem } from "../../game/storyItem/storyItem";
import { DragonScale } from "../../game/storyItem/dragonScale";

const StoryItemFactory: Record<string, () => StoryItem> = {
  slime_baby: () => new SlimeBaby(),
  molten_heart: () => new MoltenHeart(),
  dragon_scale: () => new DragonScale(),
};

export function createStoryItem(id: string): StoryItem {
  const creator = StoryItemFactory[id];
  console.log(creator, "THIS IS THE CREATOR");
  if (!creator) {
    throw new Error(`Unknown Story Item ID: ${id}`);
  }
  return creator();
}
