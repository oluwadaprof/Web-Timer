import React, { useState, useEffect } from "react";
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
import { format, addDays } from "date-fns";
import { ActivityChart } from "./components/ActivityChart";
import { EmptyState } from "./components/EmptyState";
import { UserAvatar } from "@/components/auth/UserAvatar";
import { useAuthStore } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";

const WebTrackDisplay = ({ defaultTab = "summary" }) => {
  const { user } = useAuthStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState(defaultTab);
  const [hasData, setHasData] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .eq("user_id", user.id)
          .gte("start_time", format(selectedDate, "yyyy-MM-dd"))
          .lt("start_time", format(addDays(selectedDate, 1), "yyyy-MM-dd"))
          .order("start_time", { ascending: false });

        if (error) throw error;
        setActivities(data || []);
        setHasData(data && data.length > 0);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchActivities();

    // Set up real-time subscription
    const subscription = supabase
      .channel("activities")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "activities",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          fetchActivities(); // Refetch on any change
        },
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [user, selectedDate]);

  if (!user) {
    return (
      <div className="w-full h-[calc(100vh-80px)] bg-[#2A2E37] p-6 text-white">
        <EmptyState
          title="Sign in to access Web Track"
          description="Connect with your Google account to start tracking your productivity across applications."
        />
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#2A2E37] p-6 text-white">
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
      </div>

      <div className="flex gap-6">
        <div className="flex-1 bg-[#3A3F4B] rounded-lg p-6 h-[calc(100vh-200px)]">
          <div className="flex items-center gap-2 mb-6">
            <BarChart className="h-5 w-5 text-[#7B89F4]" />
            <h2 className="text-lg font-medium">Activity Overview</h2>
          </div>

          <ActivityChart />

          {/* Analytics Grid */}
          <div className="mt-14 grid grid-cols-3 gap-4">
            {!hasData ? (
              <div className="col-span-3">
                <EmptyState
                  title="No analytics data available"
                  description="Your productivity metrics will appear here once you start using the browser extension."
                />
              </div>
            ) : (
              // Your existing analytics cards here
              <div>Analytics cards will go here</div>
            )}
          </div>
        </div>

        {/* Right Column - Statistics */}
        <div className="w-[400px]">
          <Card className="bg-[#3A3F4B] border-0 p-6 h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
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

              <TabsContent value="summary">
                {!hasData ? (
                  <div className="mt-6 bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                    <EmptyState
                      title="No summary data"
                      description="Your summary statistics will appear here once tracking begins."
                    />
                  </div>
                ) : (
                  <div>Summary content will go here</div>
                )}
              </TabsContent>

              <TabsContent value="apps">
                {!hasData ? (
                  <div className="mt-6 bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                    <EmptyState
                      title="No apps data"
                      description="Your app statistics will appear here once tracking begins."
                    />
                  </div>
                ) : (
                  <div>Apps content will go here</div>
                )}
              </TabsContent>

              <TabsContent value="windows">
                {!hasData ? (
                  <div className="mt-6 bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                    <EmptyState
                      title="No windows data"
                      description="Your window statistics will appear here once tracking begins."
                    />
                  </div>
                ) : (
                  <div>Windows content will go here</div>
                )}
              </TabsContent>

              <TabsContent value="domains">
                {!hasData ? (
                  <div className="mt-6 bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                    <EmptyState
                      title="No domains data"
                      description="Your domain statistics will appear here once tracking begins."
                    />
                  </div>
                ) : (
                  <div>Domains content will go here</div>
                )}
              </TabsContent>
            </Tabs>

            {/* Recommended Activities */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Recommended Focus Sessions
              </h3>
              {!hasData ? (
                <div className="bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                  <EmptyState
                    title="No recommendations yet"
                    description="Focus session recommendations will appear here based on your activity patterns."
                  />
                </div>
              ) : (
                <div>Recommendations will go here</div>
              )}
            </div>

            {/* Productivity Goals */}
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">Today's Goals</h3>
              {!hasData ? (
                <div className="bg-[#2A2E37]/50 rounded-xl p-6 border border-[#3A3F4B]/30">
                  <EmptyState
                    title="No goals set"
                    description="Your productivity goals and progress will appear here once you start setting targets."
                  />
                </div>
              ) : (
                <div>Goals will go here</div>
              )}
            </div>
          </Card>
        </div>
      </div>

      <style>{`
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
