"use client";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export function SwitchDarkMode() {
  const [isDark, setIsDark] = useState(false);

  const handleThemeChange = (checked: boolean) => {
    setIsDark(checked);

    const root = window.document.documentElement;
    if (checked) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        id="dark-mode"
        checked={isDark}
        onCheckedChange={handleThemeChange}
      />
      <Label htmlFor="dark-mode">Dark Mode</Label>
    </div>
  );
}
