import { GrandBadge } from "../../game/storyItem/grandBadge";
import { MaladyBadge } from "../../game/storyItem/maladyBadge";
import { SlimeBaby } from "../../game/storyItem/slimeBaby";
import { StaminaBadge } from "../../game/storyItem/staminaBadge";
import { StoryItem } from "../../game/storyItem/storyItem";
import { EverbloomingLotus } from "../../game/storyItem/everbloomingLotus";
import { DragonScale } from "../../game/storyItem/dragonScale";
import { TitanicBadge } from "../../game/storyItem/titanicBadge";

const StoryItemFactory: Record<string, () => StoryItem> = {
  slime_baby: () => new SlimeBaby(),
  everblooming_lotus: () => new EverbloomingLotus(),
  dragon_scale: () => new DragonScale(),
  titanic_badge: () => new TitanicBadge(),
  malady_badge: () => new MaladyBadge(),
  stamina_badge: () => new StaminaBadge(),
  grand_badge: () => new GrandBadge(),
};

export function createStoryItem(id: string): StoryItem {
  const creator = StoryItemFactory[id];
  if (!creator) {
    throw new Error(`Unknown Story Item ID: ${id}`);
  }
  return creator();
}
