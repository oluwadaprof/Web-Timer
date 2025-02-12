import React from "react";
import { Brain, Coffee, Timer } from "lucide-react";

export const RecommendedActivities = () => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium mb-4">Recommended Focus Sessions</h3>
      <div className="space-y-4">
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

        <div className="flex items-center gap-4 bg-[#2A2E37] p-4 rounded-lg cursor-pointer hover:bg-[#343842] transition-colors">
          <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
            <Coffee className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Break Reminder</h4>
              <span className="text-sm text-gray-400">15 min</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Time for a short break</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-[#2A2E37] p-4 rounded-lg cursor-pointer hover:bg-[#343842] transition-colors">
          <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
            <Timer className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Focus Timer</h4>
              <span className="text-sm text-gray-400">25 min</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Pomodoro technique</p>
          </div>
        </div>
      </div>
    </div>
  );
};
