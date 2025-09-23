import { StatusType } from "../../../../../types/single/statusType";
import { Player } from "../player";
import { StartStatus } from "./startStatus";
import { Stun } from "./stun";
import { Weak } from "./weak";

export class Strong extends StartStatus {
  private active: boolean = false;
  private weakenCount: number;

  constructor(countDown: number, weakenCount?: number) {
    super(
      "Strong",
      "The strength is crazy, I sure hope I won't feel weakened once this wears off...",
      countDown,
      StatusType.BUFF
    );
    this.weakenCount = weakenCount ?? 2;
  }

  public startingEffect(player: Player): void {
    if (this.active == false) {
      player.getMonster()?.incAttackBonus(+5);
      player.getMonster()?.incArmourClass(+5);
      this.active = true;
      console.log(`${player.getName()} has gained STRENGTH!`);
    } else {
      console.log(`${player.getName()} is already strong enough.`);
    }
  }

  public updateLogs(player: Player): void {}

  public expire(player: Player): void {
    player.getMonster()?.incArmourClass(-5);
    player.getMonster()?.incAttackBonus(-5);

    //TODO: this doesn't work.
    player.addStatus(new Weak(this.weakenCount));
    player.addStatus(new Stun(2));
    console.log("ADV: STRONG EXPIRED");
    this.active = false;
  }
}
