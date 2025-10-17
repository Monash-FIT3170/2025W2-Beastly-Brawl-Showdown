import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";

export class SlimeBoost extends StartStatus {
  constructor(countdown: number) {
    super(
      "Slime Boost",
      "Buff your lowest rated stat!",
      countdown +1,
      StatusType.BUFF
    );
  }

  public startingEffect(player: Player): void {
    const buffedStat = this.getLowestStat(player);
    // console.error(
    //   `SLIME BOOST DEBUG for ${player.getName()}, Stat Boosted: ${buffedStat}`
    // );
    switch (buffedStat) {
      case "AC":
        player.incArmourClassStat(5);
        player.addLog("Your Slime Boost has increased your Armour Class by 5!");
        console.log(`Slime Boost: ${player.getName()} Boosted AC +5`);
        break;
      case "HP":
        player.incHealth(+2);
        player.addLog("Your Slime Boost has increased your HP by 2!");
        console.log(`Slime Boost: ${player.getName()} Boosted HP + 2`);
        break;
      case "ATK":
        player.incAttackStat(2);
        player.addLog("Your Slime Boost has increased your Attack Bonus by 2!");
        console.log(`Slime Boost: ${player.getName()} Boosted ATK Bonus +2`);
        break;
    }

    //TODO: add a different animation to show which stat has been buffed.
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

    var stats = {
      AC: this.getRelativeValue(currentAC, acScale),
      ATK: this.getRelativeValue(currentATK, atkScale),
      HP: this.getRelativeValue(currentHP, hpScale),
    };

    if (currentHP < 1) {
      stats = {
        AC: this.getRelativeValue(currentAC, acScale),
        ATK: this.getRelativeValue(currentATK, atkScale),
        HP: 100,
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

  public updateLogs(player: Player): void {}

  public expire(): void {}
}
