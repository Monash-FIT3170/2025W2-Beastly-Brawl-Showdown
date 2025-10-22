import { GameModeIdentifier } from "../../../types/single/gameMode";

export type GameModeCardData = {
  title: string;
  description: string;
  mode: GameModeIdentifier;

  // Additional card data for sliders
  sliderText?: string;
  sliderMin?: number;
  sliderMax?: number;
  sliderSelectedValue?: number;
};

export type BackgroundThemeCardData = {
  name: string;
};
