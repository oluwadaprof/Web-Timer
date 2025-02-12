import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import { Maximize2, Timer, Clock, Bell, Globe, BarChart2 } from "lucide-react";
import { UserAvatar } from "@/components/auth/UserAvatar";
import StopwatchDisplay from "./stopwatch/StopwatchDisplay";
import { motion } from "framer-motion";
import { Card } from "./ui/card";
import TimerDisplay from "./timer/TimerDisplay";
import WorldClockDisplay from "./worldclock/WorldClockDisplay";
import WebTrackDisplay from "./webtrack/WebTrackDisplay";

interface TimerTabsProps {
  defaultTab?: string;
}

const shakeAnimation = {
  shake: {
    x: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "loop" as const,
    },
  },
  stop: {
    x: 0,
  },
};

const TimerTabs = ({ defaultTab = "timer" }: TimerTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [timeLeft, setTimeLeft] = useState(300);

  return (
    <div className="w-full h-screen bg-[#2A2E37] overflow-hidden">
      <div className="w-full h-full">
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <div className="flex justify-between items-center p-4">
            <TabsList className="inline-flex bg-transparent gap-4">
              <style jsx>{`
                [data-state="active"] {
                  background-color: #7b89f4 !important;
                  color: white !important;
                }
              `}</style>
              <motion.div
                animate={
                  activeTab === "timer" && timeLeft < 60 && timeLeft > 0
                    ? "shake"
                    : "stop"
                }
                variants={shakeAnimation}
              >
                <TabsTrigger
                  value="timer"
                  className={`flex items-center gap-2 rounded-full px-6 py-2 ${timeLeft < 60 && timeLeft > 0 ? "bg-red-500 hover:bg-red-600" : "bg-[#3A3F4B] hover:bg-[#4A4F5B]"} text-white`}
                >
                  <Timer className="h-4 w-4" /> Timer
                </TabsTrigger>
              </motion.div>
              <TabsTrigger
                value="stopwatch"
                className="flex items-center gap-2 rounded-full px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B]"
              >
                <Clock className="h-4 w-4" /> Stopwatch
              </TabsTrigger>
              <TabsTrigger
                value="alarm"
                className="flex items-center gap-2 rounded-full px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B]"
              >
                <Bell className="h-4 w-4" /> Alarm
              </TabsTrigger>
              <TabsTrigger
                value="worldclock"
                className="flex items-center gap-2 rounded-full px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B]"
              >
                <Globe className="h-4 w-4" /> World Clock
              </TabsTrigger>
              <TabsTrigger
                value="webtrack"
                className="flex items-center gap-2 rounded-full px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B]"
              >
                <BarChart2 className="h-4 w-4" /> Web Track
              </TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-[#3A3F4B]"
                onClick={() => {
                  if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                  } else {
                    document.exitFullscreen();
                  }
                }}
              >
                <Maximize2 className="h-6 w-6" />
              </Button>
              <UserAvatar />
            </div>
          </div>

          <TabsContent value="timer" className="mt-4">
            <div className="flex justify-center">
              <TimerDisplay onTimeChange={(time) => setTimeLeft(time)} />
            </div>
          </TabsContent>

          <TabsContent value="stopwatch" className="mt-4">
            <StopwatchDisplay />
          </TabsContent>

          <TabsContent value="alarm" className="mt-4">
            <div className="flex justify-center items-center h-[400px]">
              <p className="text-muted-foreground">
                Alarm functionality coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="worldclock" className="mt-4">
            <WorldClockDisplay />
          </TabsContent>

          <TabsContent value="webtrack" className="mt-4">
            <WebTrackDisplay />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TimerTabs;
