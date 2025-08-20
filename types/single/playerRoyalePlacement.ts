// Interface for player battle royale placement
// Royale placement does not belong to Player as an attribute since it's only relevant to Battle Royale Mode
export interface PlayerRoyalePlacement {
  playerId: string;
  name: string;
  placement: number;
}
