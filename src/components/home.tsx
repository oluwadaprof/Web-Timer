import React, { useState } from "react";
import TimerTabs from "./TimerTabs";
import ThemeControls from "./ThemeControls";

const Home = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [accentColor, setAccentColor] = useState("#0066ff");

  return (
    <div className="min-h-screen w-full bg-[#2A2E37]">
      <TimerTabs />
    </div>
  );
};

export default Home;
