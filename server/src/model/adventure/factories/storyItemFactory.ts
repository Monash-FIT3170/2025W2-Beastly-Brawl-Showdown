import { MaladyBadge } from "../../game/storyItem/maladyBadge";
import { SlimeBaby } from "../../game/storyItem/slimeBaby";
import { StoryItem } from "../../game/storyItem/storyItem";
import { TitanicBadge } from "../../game/storyItem/titanicBadge";

const StoryItemFactory: Record<string, () => StoryItem> = {
  slime_baby: () => new SlimeBaby(),
  titanic_badge: () => new TitanicBadge(),
  malady_badge: () => new MaladyBadge(),
};

export function createStoryItem(id: string): StoryItem {
  const creator = StoryItemFactory[id];
  if (!creator) {
    throw new Error(`Unknown Story Item ID: ${id}`);
  }
  return creator();
}
