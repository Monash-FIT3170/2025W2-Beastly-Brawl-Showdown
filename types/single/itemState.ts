export interface EquipmentState {
  name: string;
  description: string;
  statDescription: string;
  imageString: string;
}

export interface ConsumableState {
  name: string;
  description: string;
  statDescription: string;
  imageString: string;
  type: ConsumableType;
}

export enum ConsumableType {
  SELF_INFLICT = "SELF_INFLICT",
  ENEMY_INFLICT = "ENEMY_INFLICT",
}
