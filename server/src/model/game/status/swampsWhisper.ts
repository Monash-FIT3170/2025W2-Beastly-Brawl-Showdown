import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";

export class SwampsWhisper extends StartStatus {
  constructor(countDown: number) {
    super(
      "Swamps Whisper",
      "Your thoughts drift like mist. Your crit hit rate reduces.",
      countDown,
      StatusType.DEBUFF
    );
  }

  public startingEffect(player: Player): void {
    const monster = player.getMonster();
    monster?.incCritRate(-10)
    console.log(`${player.getName()}'s crit rate is reduced by 10%`);
  }

  public updateLogs(player: Player): void {}
  public expire(player: Player): void {
    const monster = player.getMonster();
    monster?.incCritRate(10)
    console.log(`Swamp's Whisper fades. Your strength for critical strikes returns.`);
  }
}
