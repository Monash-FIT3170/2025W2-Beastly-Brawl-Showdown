import stage1 from "./stages/stage1.json";
import stage2 from "./stages/stage2.json";
import stage3 from "./stages/stage3.json";
import stage4 from "./stages/stage4.json";
import stage5 from "./stages/stage5.json";
import stage6 from "./stages/stage6.json";
import stage7 from "./stages/stage7.json";
import stage8 from "./stages/stage8.json";

export function loadStage(stageNumber: number) {
  if (stageNumber === 1) {
    // console.log("Loading Stage 1 from JSON: ", stage1);
    return stage1;
  } else if (stageNumber === 2) {
    return stage2;
  } else if (stageNumber === 3) {
    return stage3;
  } else if (stageNumber === 4) {
    return stage4;
  } else if (stageNumber === 5) {
    return stage5;
  } else if (stageNumber === 6) {
    return stage6;
  } else if (stageNumber === 7) {
    return stage7;
  } else if (stageNumber === 8) {
    return stage8;
  } else {
    return stage8;
  }

  throw new Error(`No stage defined for ${stageNumber}`);
}
