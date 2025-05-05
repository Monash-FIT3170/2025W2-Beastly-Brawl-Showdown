import { UUID } from "crypto";
import { Monster } from "./monster/monster";

export class Player {
  private id: UUID;
  private name: string;
  private monster: Monster;
  private health: number;

  constructor(name: string, monster: Monster) {
    this.name = name;
    this.id = crypto.randomUUID();
    this.monster = monster;
    this.health = monster.getMaxHealth();
  }

  public getName(): string {
    return this.name;
  }

  public getId(): UUID {
    return this.id;
  }

  public getMonster(): Monster {
    return this.monster;
  }

  public getHealth(): number {
    return this.health;
  }

  public setHealth(health: number): void {
    this.health = health;
  }

  public addHealth(number: number): void {
    this.health += number;
    if (this.health < 0) {
      this.health = 0;
    } else if (this.health > this.monster.getMaxHealth()) {
      this.health = this.monster.getMaxHealth();
    }
  }
}
