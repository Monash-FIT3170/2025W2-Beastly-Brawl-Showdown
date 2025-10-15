import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { EndStatus } from "./endStatus";
import { Status } from "./status";

export class Resurrection extends EndStatus {
  private used: boolean = false;
  //TODO: pick a statustype..
  constructor(countdown: number = 20) {
    super(
      "Resurrection",
      "You have 30% chance to resurrect after death.",
      countdown,
      StatusType.BUFF
    );
  }

  public isUsed(): boolean {
    return this.used;
  }

  public endingEffect(player: Player): boolean {
    //not working, need fix
    const resurrect = player
      .getStatuses()
      .find((s) => s.getName() === "Resurection") as Resurrection | undefined;

    if (!resurrect || resurrect.isUsed()) {
      return false;
    }

    const roll = Math.random();

    if (roll < 300 && player.getHealth() == 0) {
      resurrect.used = true;
      const monster = player.getMonster();
      const maxHp = monster ? monster.getMaxHealth() : 0;
      const newHp = Math.max(1, Math.ceil(maxHp * 0.5));

      player.setHealth(newHp);

      // Flavor logs
      player.addLog(
        "The Everbloom Fragment pulses, petals bloom in light as you return to life!"
      );
      player.addBattleLog(
        `${player.getName()} is revived by the Everbloom Fragment!`
      );

      return true;
    } else {
      player.addBattleLog(
        `${player.getName()}'s Everbloom Fragment flickers... then falls silent.`
      );
      return false;
    }
  }

  public updateLogs(player: Player): void {
    player.addLog("You have been blessed, resurrection is possible!");
  }

  public expire(): void {
    console.error("Method not implemented.");
  }
}
