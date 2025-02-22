import React from "react";
import TimerTabs from "./TimerTabs";

const Home = () => {
  return (
    <div className="min-h-screen w-full bg-[#2A2E37]">
      <TimerTabs defaultTab="timer" />
    </div>
  );
};

export default Home;
