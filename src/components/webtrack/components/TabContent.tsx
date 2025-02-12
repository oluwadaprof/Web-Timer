import React from "react";
import { ActivityData } from "../types";

interface TabContentProps {
  title: string;
  data: ActivityData[];
}

export const TabContent = ({ title, data }: TabContentProps) => {
  return (
    <div className="rounded-xl px-2">
      <h3 className="text-lg font-medium mb-4 text-slate-200">{title}</h3>
      <div className="space-y-4 mt-5">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className={`w-2 h-12 rounded-full ${item.color}`} />
            <div className="flex-1">
              <div className="text-sm font-medium">{item.name}</div>
              <div className="text-sm text-gray-400">{item.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
