import React from "react";
import { Target } from "lucide-react";

export const ProductivityGoals = () => {
  return (
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
  );
};
