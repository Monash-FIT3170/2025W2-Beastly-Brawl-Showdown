import { SlimeFriend } from "../../game/storyItem/slimeFriend";
import { StoryItem } from "../../game/storyItem/storyItem";

const StoryItemFactory: Record<string, () => StoryItem> = {
  slime_friend: () => new SlimeFriend(),
};

export function createStoryItem(id: string): StoryItem {
  const creator = StoryItemFactory[id];
  console.log(creator, "THIS IS THE CREATOR");
  if (!creator) {
    throw new Error(`Unknown Story Item ID: ${id}`);
  }
  return creator();
}
