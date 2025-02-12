import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabContent } from "./TabContent";
import type { ActivityData } from "../types";
import { topApplications, topWindows, topDomains } from "../data/mockData";

interface ActivityTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

const tabData = [
  { value: "summary", title: "Top Applications", data: topApplications },
  { value: "apps", title: "Applications", data: topApplications },
  { value: "windows", title: "Window Titles", data: topWindows },
  { value: "domains", title: "Browser Domains", data: topDomains },
];

export const ActivityTabs = ({
  selectedTab,
  onTabChange,
}: ActivityTabsProps) => {
  return (
    <Tabs
      defaultValue={selectedTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-4 bg-[#2A2E37]">
        {tabData.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="text-white data-[state=active]:bg-[#4A4F5B]"
          >
            {tab.value.charAt(0).toUpperCase() + tab.value.slice(1)}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabData.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-4">
          <TabContent title={tab.title} data={tab.data} />
        </TabsContent>
      ))}
    </Tabs>
  );
};
