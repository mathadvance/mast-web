import RadioGroup from "@/components/RadioGroup";

import { useAuth } from "@/contexts/AuthProvider";
import { useTheme } from "@/contexts/ThemeProvider";

import { FormSubmit } from "@/components/FormComponents";

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme, sideBarColor, setSideBarColor } = useTheme();

  function onSubmit() {
    fetch("/api/settings", {
      method: "POST",
      body: JSON.stringify({
        username: user.username,
        Settings: {
          theme_preference: theme,
          sidebar_color: sideBarColor,
        },
      }),
    });
  }

  return (
    <>
      <h1>Settings</h1>
      <p>
        Persist your settings if you want them to be loaded the next time you
        visit the site.
      </p>
      <RadioGroup
        label={"Theme"}
        value={theme}
        onChange={setTheme}
        options={[
          {
            value: "light",
            label: "Light Theme",
          },
          {
            value: "dark",
            label: "Dark Theme",
          },
          {
            value: "browser",
            label: "Browser Theme",
            desc: "This is determined through the prefers-color-scheme media query.",
          },
        ]}
      />
      <RadioGroup
        label={"Navbar Color"}
        value={sideBarColor}
        onChange={setSideBarColor}
        options={[
          {
            value: "pink",
            label: "Pink",
          },
          {
            value: "blue",
            label: "Blue",
          },
        ]}
      />
      <FormSubmit
        text="Persist Settings"
        onClick={() => {
          onSubmit();
        }}
      />
    </>
  );
}
