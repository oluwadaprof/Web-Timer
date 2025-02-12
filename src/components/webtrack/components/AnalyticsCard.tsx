import React from "react";
import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface AnalyticsCardProps {
  title: string;
  value: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  icon: LucideIcon;
  gradientColor: string;
}

export const AnalyticsCard = ({
  title,
  value,
  trend,
  icon: Icon,
  gradientColor,
}: AnalyticsCardProps) => {
  return (
    <Card className="bg-[#2A2E37] border-0 p-4 relative overflow-hidden group hover:bg-[#343842] transition-all duration-300">
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-${gradientColor}/20 to-transparent rounded-bl-full transform translate-x-8 -translate-y-8`}
      ></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </div>
        <div className="text-2xl font-semibold">{value}</div>
        {trend && (
          <div
            className={`text-xs ${trend.isPositive ? "text-green-400" : "text-red-400"} mt-1`}
          >
            {trend.isPositive ? "↑" : "↓"} {trend.value}
          </div>
        )}
      </div>
    </Card>
  );
};
