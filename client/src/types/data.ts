export interface BlockData {
  playerName: string;
  blocksAmount: number;
}

export interface DamageData {
  playerName: string;
  damageAmount: number;
}

export interface PlayerStats {
  blockData: BlockData[];
  damageData: DamageData[];
}