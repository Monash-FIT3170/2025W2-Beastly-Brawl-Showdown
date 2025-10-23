const SELECTED_BACKGROUND_THEME = "selectedBackgroundTheme";

export const setSelectedBackgroundTheme = (backgroundTheme: string): void => {
  localStorage.setItem(SELECTED_BACKGROUND_THEME, backgroundTheme);
};

export const removeSelectedBackgroundTheme = (): void => {
  localStorage.removeItem(SELECTED_BACKGROUND_THEME);
};

export const getSelectedBackgroundTheme = (): string => {
  return localStorage.getItem(SELECTED_BACKGROUND_THEME) || "Forest";
};
