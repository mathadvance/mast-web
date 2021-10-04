import { createContext, useState, useEffect } from "react";

const ThemeContext = createContext<{ theme: string }>({ theme: null });

export default function ThemeProvider({ children }) {
  const [theme, rawSetTheme] = useState();

  // setTheme adds or removes dark to classList appropriately
  const setTheme = (theme) => {
    rawSetTheme(theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // get OS theme
  const getOSTheme = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  useEffect(() => {
    // add check for user option later
    setTheme(getOSTheme());
  });

  return (
    <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
  );
}
