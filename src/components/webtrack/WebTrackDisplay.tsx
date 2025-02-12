import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings2,
  Calendar as CalendarIcon,
  Target,
  Brain,
  Clock,
  Zap,
  AlertCircle,
  Coffee,
  Laptop,
  Chrome,
  BarChart,
  History,
  Timer,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ActivityList } from "./components/ActivityList";
import { ActivityChart } from "./components/ActivityChart";
import { topApplications, topWindows, topDomains } from "./data/mockData";
import type { WebTrackDisplayProps } from "./types";

const WebTrackDisplay = ({ defaultTab = "summary" }: WebTrackDisplayProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  return (
    <div className="flex h-[calc(100vh-112px)] bg-[#2A2E37] text-white p-6 overflow-hidden">
      {/* Left Column - Activity Graph */}
      <div className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-[280px] justify-start text-left font-normal hover:bg-[#3A3F4B]",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-[#3A3F4B] border-[#4A4F5B]">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  initialFocus
                  className="bg-[#3A3F4B] text-white rounded-md"
                  classNames={{
                    months: "space-y-4",
                    month: "space-y-4",
                    caption:
                      "flex justify-center pt-1 relative items-center text-white",
                    caption_label: "text-sm font-medium text-white",
                    nav: "space-x-1 flex items-center",
                    nav_button:
                      "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 hover:bg-[#4A4F5B] rounded-md",
                    nav_button_previous: "absolute left-1",
                    nav_button_next: "absolute right-1",
                    table: "w-full border-collapse space-y-1",
                    head_row: "flex",
                    head_cell:
                      "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                    row: "flex w-full mt-2",
                    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-[#4A4F5B] h-9 w-9 rounded-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
                    day: "h-9 w-9 p-0 font-normal text-white aria-selected:opacity-100 hover:bg-[#4A4F5B] rounded-md hover:bg-[#4A4F5B] hover:text-white focus:bg-[#4A4F5B] focus:text-white",
                    day_today: "bg-[#7B89F4] text-white",
                    day_outside: "text-muted-foreground opacity-50",
                    day_disabled: "text-muted-foreground opacity-50",
                    day_range_middle:
                      "aria-selected:bg-[#4A4F5B] aria-selected:text-white",
                    day_hidden: "invisible",
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-[#3A3F4B]"
          >
            <Settings2 className="h-6 w-6" />
          </Button>
        </div>

        <div className="bg-[#3A3F4B] rounded-lg p-6 h-[calc(100vh-200px)]">
          <div className="flex items-center gap-2 mb-6">
            <BarChart className="h-5 w-5 text-[#7B89F4]" />
            <h2 className="text-lg font-medium">Activity Overview</h2>
          </div>

          <ActivityChart />

          {/* Analytics Grid */}
          <div className="mt-14 grid grid-cols-3 gap-4">
            {/* Productivity Score */}
            <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#7B89F4]/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Target className="h-4 w-4" />
                  <span>Productivity Score</span>
                </div>
                <div className="text-2xl font-semibold text-[#7B89F4]">85%</div>
                <div className="text-xs text-green-400 mt-1">
                  ↑ 12% vs. yesterday
                </div>
              </div>
            </Card>

            {/* Focus Time */}
            <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Brain className="h-4 w-4" />
                  <span>Focus Time</span>
                </div>
                <div className="text-2xl font-semibold">4h 28m</div>
                <div className="text-xs text-red-400 mt-1">
                  ↓ 45m vs. yesterday
                </div>
              </div>
            </Card>

            {/* Active Hours */}
            <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Active Hours</span>
                </div>
                <div className="text-2xl font-semibold">8h 12m</div>
                <div className="text-xs text-green-400 mt-1">
                  ↑ 1h vs. yesterday
                </div>
              </div>
            </Card>

            {/* Most Productive Time */}
            <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Zap className="h-4 w-4" />
                  <span>Peak Performance</span>
                </div>
                <div className="text-2xl font-semibold">10 AM</div>
                <div className="text-xs text-gray-400 mt-1">
                  Most productive hour
                </div>
              </div>
            </Card>

            {/* Distractions */}
            <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-red-500/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <AlertCircle className="h-4 w-4" />
                  <span>Distractions</span>
                </div>
                <div className="text-2xl font-semibold">12</div>
                <div className="text-xs text-green-400 mt-1">
                  ↓ 4 vs. yesterday
                </div>
              </div>
            </Card>

            {/* Break Time */}
            <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-500/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Coffee className="h-4 w-4" />
                  <span>Break Time</span>
                </div>
                <div className="text-2xl font-semibold">1h 15m</div>
                <div className="text-xs text-gray-400 mt-1">
                  Recommended: 1h 30m
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            {/* Most Used Apps */}
            <Card className="bg-[#2A2E37] border-0 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <Laptop className="h-4 w-4" />
                <span>Most Used Apps</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#7B89F4]"></div>
                    <span className="text-sm">VS Code</span>
                  </div>
                  <span className="text-sm text-gray-400">2h 15m</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span className="text-sm">Chrome</span>
                  </div>
                  <span className="text-sm text-gray-400">1h 45m</span>
                </div>
              </div>
            </Card>

            {/* Time Distribution */}
            <Card className="bg-[#2A2E37] border-0 p-4">
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
                <History className="h-4 w-4" />
                <span>Time Distribution</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span className="text-sm">Productive</span>
                  </div>
                  <span className="text-sm text-gray-400">65%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <span className="text-sm">Distracting</span>
                  </div>
                  <span className="text-sm text-gray-400">35%</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Right Column - Statistics */}
      <div className="w-[400px] ml-6">
        <Card className="bg-[#3A3F4B] border-0 p-6 h-[calc(100vh-138px)] overflow-y-auto custom-scrollbar">
          <Tabs
            defaultValue={selectedTab}
            onValueChange={setSelectedTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4 bg-[#2A2E37]">
              <TabsTrigger
                value="summary"
                className="text-white data-[state=active]:bg-[#4A4F5B]"
              >
                Summary
              </TabsTrigger>
              <TabsTrigger
                value="apps"
                className="text-white data-[state=active]:bg-[#4A4F5B]"
              >
                Apps
              </TabsTrigger>
              <TabsTrigger
                value="windows"
                className="text-white data-[state=active]:bg-[#4A4F5B]"
              >
                Windows
              </TabsTrigger>
              <TabsTrigger
                value="domains"
                className="text-white data-[state=active]:bg-[#4A4F5B]"
              >
                Domains
              </TabsTrigger>
            </TabsList>

            <TabsContent value="summary" className="mt-6">
              <div className="bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                <h3 className="text-lg font-medium mb-4 text-slate-200">
                  Top Applications
                </h3>
                <ActivityList data={topApplications} />
              </div>
            </TabsContent>

            <TabsContent value="apps" className="mt-6">
              <div className="bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                <h3 className="text-lg font-medium mb-4 text-slate-200">
                  Applications
                </h3>
                <ActivityList data={topApplications} />
              </div>
            </TabsContent>

            <TabsContent value="windows" className="mt-6">
              <div className="bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                <h3 className="text-lg font-medium mb-4 text-slate-200">
                  Window Titles
                </h3>
                <ActivityList data={topWindows} />
              </div>
            </TabsContent>

            <TabsContent value="domains" className="mt-6">
              <div className="bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                <h3 className="text-lg font-medium mb-4 text-slate-200">
                  Browser Domains
                </h3>
                <ActivityList data={topDomains} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Recommended Activities */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">
              Recommended Focus Sessions
            </h3>
            <div className="space-y-4">
              {/* Deep Work Session */}
              <div className="flex items-center gap-4 bg-[#2A2E37] p-4 rounded-lg cursor-pointer hover:bg-[#343842] transition-colors">
                <div className="w-12 h-12 bg-[#7B89F4] rounded-xl flex items-center justify-center">
                  <Brain className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Deep Work Session</h4>
                    <span className="text-sm text-gray-400">90 min</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Based on your peak performance time
                  </p>
                </div>
              </div>

              {/* Break Reminder */}
              <div className="flex items-center gap-4 bg-[#2A2E37] p-4 rounded-lg cursor-pointer hover:bg-[#343842] transition-colors">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                  <Coffee className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Break Reminder</h4>
                    <span className="text-sm text-gray-400">15 min</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Time for a short break
                  </p>
                </div>
              </div>

              {/* Focus Timer */}
              <div className="flex items-center gap-4 bg-[#2A2E37] p-4 rounded-lg cursor-pointer hover:bg-[#343842] transition-colors">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Timer className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Focus Timer</h4>
                    <span className="text-sm text-gray-400">25 min</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">
                    Pomodoro technique
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Productivity Goals */}
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Today's Goals</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7B89F4] rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Productivity Target</h4>
                    <span className="text-sm text-[#7B89F4]">6h / 8h</span>
                  </div>
                  <div className="w-full h-2 bg-[#2A2E37] rounded-full mt-2">
                    <div className="h-full w-3/4 bg-[#7B89F4] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2a2e37;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3a3f4b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a4f5b;
        }
      `}</style>
    </div>
  );
};

export default WebTrackDisplay;
