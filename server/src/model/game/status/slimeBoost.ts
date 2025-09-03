import { Player } from "../player";
import { Status } from "./status";

export class SlimeBoost extends Status {
  constructor(countdown: number) {
    super("Slime Boost", "Buff your lowest rated stat!", countdown);
  }

  public effect(player: Player): void {
    //CURRENTLY: only checks AC, HP, ATK+
    const buffedStat = this.getLowestStat(player);
    var current = 0;
    switch (buffedStat) {
      case "AC":
        //Doubles AC for this round.
        current = player.getArmourClassStat();
        player.incArmourClassStat(5);
        console.log(`Slime Boost: Boosted AC +5`);
      case "HP":
        // Heals for 3 HP
        current = player.getHealth();
        player.incHealth(3);
        console.log(`Slime Boost: ${player.getName()} Healed 3 HP`);
      default:
        //Doubles ATK+
        current = player.getAttackStat();
        player.incAttackStat(2);
        console.log(`Slime Boost: ${player.getName()} Boosted ATK Bonus +2`);
    }

    console.error("Slime Support NOT TESTED");
    //TODO: check how long stats are affected
  }

  private getLowestStat(player: Player): string {
    //TODO: verify my ranges/scale is fine
    const minAC = (player.getMonster()?.getArmourClass() ?? 12) - 4;
    const maxAC = (player.getMonster()?.getArmourClass() ?? 16) + 4;
    const maxHP = player.getMonster()?.getMaxHealth() ?? 20;

    //SCALES
    const acScale: [number, number] = [minAC, maxAC]; // -4 monster AC to + 4 monster AC
    const atkScale: [number, number] = [0, 6]; // 0 to 6
    const hpScale: [number, number] = [1, maxHP]; //1 to max health

    const currentAC = player.getArmourClassStat();
    const currentATK = player.getAttackStat();
    const currentHP = player.getHealth();

    if (currentHP <= 0) {
      //to remove immortality
      var stats = {
        AC: this.getRelativeValue(currentAC, acScale),
        ATK: this.getRelativeValue(currentATK, atkScale),
        HP: 1000,
      };
    } else {
      stats = {
        AC: this.getRelativeValue(currentAC, acScale),
        ATK: this.getRelativeValue(currentATK, atkScale),
        HP: this.getRelativeValue(currentHP, hpScale),
      };
    }

    // Find the lowest entry
    const [lowestStatName, lowestStatValue] = Object.entries(stats).reduce(
      (lowest, current) => (current[1] < lowest[1] ? current : lowest)
    );

    return lowestStatName;
  }

  private getRelativeValue(
    value: number,
    [min, max]: [number, number]
  ): number {
    if (max === min) return (value - min) / 1; // avoid divide by zero
    return (value - min) / (max - min);
  }
}
