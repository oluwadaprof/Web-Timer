import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "./ui/button";
import {
  Maximize2,
  Timer,
  Clock,
  Globe,
  BarChart2,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Badge } from "./ui/badge";
import StopwatchDisplay from "./stopwatch/StopwatchDisplay";
import TimerDisplay from "./timer/TimerDisplay";
import WorldClockDisplay from "./worldclock/WorldClockDisplay";
import WebTrackDisplay from "./webtrack/WebTrackDisplay";
import NatureDisplay from "./nature/NatureDisplay";
import { Leaf } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimerTabsProps {
  defaultTab?: string;
}

const TimerTabs = ({ defaultTab = "timer" }: TimerTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [timeLeft, setTimeLeft] = useState(300);
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth >= 1024);

  return (
    <div className="w-full h-screen bg-[#2A2E37] overflow-hidden">
      <div className="w-full h-full">
        <TooltipProvider>
          <Tabs
            defaultValue={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-between items-start p-4 relative min-h-[60px]">
              <Button
                variant="ghost"
                size="icon"
                className="text-white lg:hidden absolute left-4 top-3 z-20"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <ChevronLeft className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>

              <div className="flex items-center gap-2">
                <TabsList
                  className={`${isMenuOpen ? "flex" : "hidden"} lg:flex flex-col lg:flex-row bg-transparent gap-2 transition-all duration-300 ease-in-out
                  ${isMenuOpen ? "fixed top-[52px] left-4 w-auto py-4 px-2 bg-[#3A3F4B] rounded-lg h-auto z-50 lg:static lg:w-auto lg:p-0 lg:bg-transparent lg:h-auto" : "w-0 lg:w-0 lg:opacity-0"} lg:gap-4 lg:overflow-x-auto lg:max-w-[calc(100vw-200px)]`}
                >
                  <TabsTrigger
                    value="timer"
                    className={`flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 ${timeLeft < 60 && timeLeft > 0 ? "bg-red-500 hover:bg-red-600" : "bg-[#3A3F4B] hover:bg-[#4A4F5B] data-[state=active]:bg-[#7B89F4] data-[state=active]:hover:bg-[#8B99FF]"} text-white whitespace-nowrap data-[state=active]:w-full`}
                  >
                    <Timer className="h-4 w-4" />
                    <span className="hidden sm:inline">Timer</span>
                  </TabsTrigger>

                  <TabsTrigger
                    value="stopwatch"
                    className="flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B] data-[state=active]:bg-[#7B89F4] data-[state=active]:hover:bg-[#8B99FF] data-[state=active]:w-full whitespace-nowrap"
                  >
                    <Clock className="h-4 w-4" />
                    <span className="hidden sm:inline">Stopwatch</span>
                  </TabsTrigger>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger
                          value="worldclock"
                          className="flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 bg-[#3A3F4B] text-white/50 hover:bg-[#4A4F5B] cursor-not-allowed whitespace-nowrap"
                          disabled
                        >
                          <Globe className="h-4 w-4" />
                          <span className="hidden sm:inline">World Clock</span>
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex items-center gap-2">
                          <span>Coming Soon</span>
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/10 text-yellow-500"
                          >
                            Soon
                          </Badge>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <TabsTrigger
                          value="webtrack"
                          className="flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 bg-[#3A3F4B] text-white/50 hover:bg-[#4A4F5B] cursor-not-allowed whitespace-nowrap"
                          disabled
                        >
                          <BarChart2 className="h-4 w-4" />
                          <span className="hidden sm:inline">Web Track</span>
                        </TabsTrigger>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="flex items-center gap-2">
                          <span>Coming Soon</span>
                          <Badge
                            variant="secondary"
                            className="bg-yellow-500/10 text-yellow-500"
                          >
                            Soon
                          </Badge>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TabsTrigger
                    value="nature"
                    className="flex items-center gap-2 rounded-full px-4 sm:px-6 py-2 bg-[#3A3F4B] text-white hover:bg-[#4A4F5B] data-[state=active]:bg-[#7B89F4] data-[state=active]:hover:bg-[#8B99FF] data-[state=active]:w-full whitespace-nowrap"
                  >
                    <Leaf className="h-4 w-4" />
                    <span className="hidden sm:inline">Nature</span>
                  </TabsTrigger>
                </TabsList>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden lg:flex items-center justify-center h-10 w-10 rounded-full bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white transition-transform duration-300"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  style={{ transform: `rotate(${isMenuOpen ? 180 : 0}deg)` }}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>

              <div
                className={`${isMenuOpen ? "lg:relative absolute right-4" : "relative"}`}
              >
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
            </div>

            <TabsContent value="timer" className="mt-0 lg:mt-4">
              <div className="flex justify-center">
                <TimerDisplay onTimeChange={(time) => setTimeLeft(time)} />
              </div>
            </TabsContent>

            <TabsContent value="stopwatch" className="mt-0 lg:mt-4">
              <StopwatchDisplay />
            </TabsContent>

            <TabsContent value="worldclock" className="mt-0 lg:mt-4">
              <WorldClockDisplay />
            </TabsContent>

            <TabsContent value="webtrack" className="mt-0 lg:mt-4">
              <WebTrackDisplay />
            </TabsContent>

            <TabsContent value="nature" className="mt-0 lg:mt-4">
              <NatureDisplay />
            </TabsContent>
          </Tabs>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default TimerTabs;
