import { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthProvider";

const ThemeContext = createContext(null);

export default function ThemeProvider({ children }) {
  const { user } = useAuth();

  const [theme, rawSetTheme] = useState(
    user ? user.Settings.theme_preference : "browser"
  );
  const [sideBarColor, setSideBarColor] = useState(
    user ? user.Settings.sidebar_color : "pink"
  );

  // setTheme adds or removes dark to classList appropriately
  function setTheme(theme: string) {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "browser") {
      if (window.matchMedia("(prefers-color-scheme-dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    rawSetTheme(theme);
  }

  // get Browser theme
  function getBrowserTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  useEffect(() => {
    // add check for user option later
    setTheme(getBrowserTheme());
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, sideBarColor, setSideBarColor }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
