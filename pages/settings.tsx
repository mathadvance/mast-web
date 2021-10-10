import { RadioGroup } from "@headlessui/react";
import {
  RadioOption,
  RadioOptionWrapper,
} from "@/components/RadioGroupComponents";
import { useState } from "react";

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
      <RadioGroup value={theme} onChange={setTheme}>
        <RadioGroup.Label>
          <h2>Theme</h2>
        </RadioGroup.Label>
        <RadioOptionWrapper>
          <RadioOption value="light" label="Light Theme" />
          <RadioOption value="dark" label="Dark Theme" />
          <RadioOption
            value="browser"
            label="Browser Theme"
            desc="This is determined through the prefers-color-scheme media query."
          />
        </RadioOptionWrapper>
      </RadioGroup>
      <RadioGroup value={sideBarColor} onChange={setSideBarColor}>
        <RadioGroup.Label>
          <h2>Navbar Color</h2>
        </RadioGroup.Label>
        <RadioOptionWrapper>
          <RadioOption value="pink" label="Pink" />
          <RadioOption value="blue" label="Blue" />
        </RadioOptionWrapper>
      </RadioGroup>
      <FormSubmit
        text="Persist Settings"
        onClick={() => {
          onSubmit();
        }}
      />
    </>
  );
}
