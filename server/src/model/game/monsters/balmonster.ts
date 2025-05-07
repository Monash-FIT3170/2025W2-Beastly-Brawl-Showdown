import { Monster } from "../monster";

class balmonster extends Monster {
  rerolls = 1;
  constructor() {
    super("bal", 25, 14, 2, 2);
  }
}
