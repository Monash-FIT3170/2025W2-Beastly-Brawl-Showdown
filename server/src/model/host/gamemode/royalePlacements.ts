import { PlayerRoyalePlacement } from "/types/single/playerRoyalePlacement";

// This will store the overall ongoing (and final) placement of players in Battle Royale mode
// Royale placement is are separated from the Player class so that it is not tied with this responsibility
export class RoyalePlacements {
  private playerRoyalePlacements = new Map<string, PlayerRoyalePlacement>();

  public register(playerId: string, name: string): void {
    if (this.playerRoyalePlacements.has(playerId))
      return;  // Avoid duplicate registration

    this.playerRoyalePlacements.set(playerId, {
      playerId,
      name,
      placement: 0  // Initialise to 0 by default (i.e., still not eliminated)
    });
  }

  public setPlayerPlacement(playerId: string, placement: number): void {
    let playerPlacement = this.playerRoyalePlacements.get(playerId);
    if (playerPlacement) {
      playerPlacement.placement = placement;
      console.log(
        "[PLACEMENT UPDATED]: Name: ", playerPlacement.name,
        ", Placement: ", playerPlacement.placement
      );
    }
  }

  // Call this after additional players are added/removed mid-royale (e.g., bots) to update the existing placements
  // change = the change in players since the last change (e.g., adding 2 players (2), removing 1 player (-1))
  public numPlayersChanged(change: number): void {
    this.playerRoyalePlacements.forEach((royalePlacement, _) => {
      if (royalePlacement.placement > 0) { // Only update players that currently have a placement
        royalePlacement.placement += change;
      }
    });
  }

  public removePlayer(playerId: string): boolean {
    return this.playerRoyalePlacements.delete(playerId);
  }

  public getPlayerRoyalePlacements(): Map<string, PlayerRoyalePlacement> {
    return this.playerRoyalePlacements;
  }

  public getPlayerRoyalePlacement(playerId: string): PlayerRoyalePlacement | undefined {
    return this.playerRoyalePlacements.get(playerId);
  }

  public getCurrentOrderedRoyalePlacements(): Array<PlayerRoyalePlacement> {
    return [...this.playerRoyalePlacements.values()].sort((a, b) => {
      return a.placement - b.placement; 
    });
  }
}
