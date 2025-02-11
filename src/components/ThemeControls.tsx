import React from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Sun, Moon, Palette } from "lucide-react";

interface ThemeControlsProps {
  theme?: "light" | "dark";
  accentColor?: string;
  onThemeChange?: (theme: "light" | "dark") => void;
  onAccentColorChange?: (color: string) => void;
}

const ThemeControls = ({
  theme = "light",
  accentColor = "#0066ff",
  onThemeChange = () => {},
  onAccentColorChange = () => {},
}: ThemeControlsProps) => {
  const accentColors = [
    { value: "#0066ff", label: "Blue" },
    { value: "#10b981", label: "Green" },
    { value: "#f43f5e", label: "Red" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#f59e0b", label: "Orange" },
  ];

  return (
    <Card className="w-[300px] p-6 bg-background">
      <div className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Theme</h3>
          <RadioGroup
            defaultValue={theme}
            onValueChange={(value) => onThemeChange(value as "light" | "dark")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="light" id="light" />
              <Label htmlFor="light" className="flex items-center gap-1">
                <Sun className="h-4 w-4" />
                Light
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="dark" id="dark" />
              <Label htmlFor="dark" className="flex items-center gap-1">
                <Moon className="h-4 w-4" />
                Dark
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Accent Color</h3>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start gap-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: accentColor }}
                />
                <Palette className="h-4 w-4" />
                <span>Select Color</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <div className="grid grid-cols-5 gap-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    className={`h-8 w-8 rounded-full transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentColor === color.value ? "ring-2 ring-offset-2" : ""}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => onAccentColorChange(color.value)}
                    title={color.label}
                  />
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </Card>
  );
};

export default ThemeControls;
