import { SeasonalEventIdentifier } from "/types/single/seasonalEventState";

export interface EventMeta {
  name: string;
  description: string;
}

export const eventMeta: Record<SeasonalEventIdentifier, EventMeta> = {
  [SeasonalEventIdentifier.SPOOK_GARDEN]: {
    name: "Spook Garden",
    description:
      "Fight a buff pumpkin monster in the yearly Halloween event.",
  },
};