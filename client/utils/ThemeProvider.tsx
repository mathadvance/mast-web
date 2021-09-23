import React from "react";

const ThemeContext = React.createContext(undefined);

const ThemeProvider: React.FC<{}> = ({ children }) => {
  const [theme, rawSetTheme] = React.useState();

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

  React.useEffect(() => {
    // add check for user option later
    setTheme(getOSTheme());
  });

  return (
    <ThemeContext.Provider value={{ theme, rawSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
