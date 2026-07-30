import { create } from "zustand";

const getInitialTheme = () => {
  const stored = localStorage.getItem("chat-theme");
  if (stored) return stored;
  return "coffee";
};

export const useThemeStore = create((set) => ({
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    document.documentElement.dataset.theme = theme;
    set({ theme });
  },
  theme: getInitialTheme(),
}));
