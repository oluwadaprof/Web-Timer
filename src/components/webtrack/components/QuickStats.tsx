import React from "react";
import { Card } from "@/components/ui/card";
import { Laptop, History } from "lucide-react";

export const QuickStats = () => {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
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
  );
};
