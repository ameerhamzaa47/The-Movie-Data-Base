import { createContext } from "react";

interface ThemeContextValues {
  theme: string;
  toggleTheme: () => void;
}

// the undefined value is here so that the context can't be used without its provider
export const ThemeContext = createContext<ThemeContextValues | undefined>(
  undefined
);