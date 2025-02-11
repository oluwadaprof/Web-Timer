import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Button } from "./ui/button";
import { Maximize2, Timer, Clock, Bell, Globe } from "lucide-react";
import { Card } from "./ui/card";
import TimerDisplay from "./timer/TimerDisplay";
import WorldClockDisplay from "./worldclock/WorldClockDisplay";

interface TimerTabsProps {
  defaultTab?: string;
}

const TimerTabs = ({ defaultTab = "timer" }: TimerTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

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
              <TabsTrigger
                value="timer"
                className="flex items-center gap-2 rounded-full px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B]"
              >
                <Timer className="h-4 w-4" /> Timer
              </TabsTrigger>
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
            </TabsList>
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
          </div>

          <TabsContent value="timer" className="mt-4">
            <div className="flex justify-center">
              <TimerDisplay />
            </div>
          </TabsContent>

          <TabsContent value="stopwatch" className="mt-4">
            <div className="flex justify-center items-center h-[400px]">
              <p className="text-muted-foreground">
                Stopwatch functionality coming soon...
              </p>
            </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default TimerTabs;
