import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ActivityList } from "./ActivityList";
import { topApplications, topWindows, topDomains } from "../data/mockData";

interface ActivityTabsProps {
  selectedTab: string;
  onTabChange: (value: string) => void;
}

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
  );
};
