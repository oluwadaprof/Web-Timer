import React, { useState } from "react";
import { Button } from "./ui/button";
import { Palette } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { themeColors, type ThemeColor } from "@/lib/theme";

const ThemeControls = () => {
  const [currentTheme, setCurrentTheme] = useState(themeColors[0]);

  const handleThemeChange = (theme: ThemeColor) => {
    setCurrentTheme(theme);
    document.documentElement.style.setProperty("--theme-accent", theme.color);
    document.documentElement.style.setProperty(
      "--theme-accent-hover",
      theme.hover,
    );
    document.documentElement.style.setProperty(
      "--theme-accent-light",
      theme.accent,
    );
    document.documentElement.style.setProperty("--tab-active", theme.color);
    document.documentElement.style.setProperty("--button-accent", theme.color);
  };

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative group rounded-full hover:opacity-80 transition-opacity"
          style={{ backgroundColor: currentTheme.color }}
        >
          <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-3 -ml-[10rem] bg-white rounded-xl border-none bg-[#4A4F5B] shadow-sm">
        <div className="grid grid-cols-7 gap-1">
          {themeColors.map((color) => (
            <Button
              key={color.name}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full p-0 relative group transition-transform hover:scale-110"
              onClick={() => handleThemeChange(color)}
              style={{ backgroundColor: color.color }}
            >
              {currentTheme.name === color.name && (
                <div className="absolute inset-0 rounded-full border-[3px] border-white" />
              )}
              <div className="absolute inset-0 rounded-full bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ThemeControls;
