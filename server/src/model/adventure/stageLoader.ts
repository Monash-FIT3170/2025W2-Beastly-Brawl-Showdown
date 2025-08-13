import stage1 from "./stages/stage1.json";

export function loadStage(stageNumber: number) {
  if (stageNumber === 1) {
    console.log("Loading Stage 1 from JSON: ", stage1);
    return stage1;
  }
  throw new Error(`No stage defined for ${stageNumber}`);
}
