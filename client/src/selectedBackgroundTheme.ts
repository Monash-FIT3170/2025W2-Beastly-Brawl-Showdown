const SELECTED_BACKGROUND_THEME = "selectedBackgroundTheme";

export const setSelectedBackgroundTheme = (backgroundTheme: string) => {
  localStorage.setItem(SELECTED_BACKGROUND_THEME, backgroundTheme);
};

export const getSelectedBackgroundTheme = () => {
  return localStorage.getItem(SELECTED_BACKGROUND_THEME) || "Forest";
};
