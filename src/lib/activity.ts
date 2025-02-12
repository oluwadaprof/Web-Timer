import { supabase } from "./supabase";
import { useAuthStore } from "./auth";

export interface ActivityEntry {
  id?: string;
  user_id: string;
  app_name: string;
  window_title: string;
  start_time: string;
  end_time?: string;
  duration?: number;
  domain?: string;
  is_productive?: boolean;
}

export const trackActivity = async (
  activity: Omit<ActivityEntry, "user_id">,
) => {
  const { user } = useAuthStore.getState();
  if (!user) return;

  try {
    const { error } = await supabase
      .from("activities")
      .insert([{ ...activity, user_id: user.id }]);

    if (error) throw error;
  } catch (error) {
    console.error("Error tracking activity:", error);
  }
};

export const getActivities = async (startDate: Date, endDate: Date) => {
  const { user } = useAuthStore.getState();
  if (!user) return [];

  try {
    const { data, error } = await supabase
      .from("activities")
      .select("*")
      .eq("user_id", user.id)
      .gte("start_time", startDate.toISOString())
      .lte("start_time", endDate.toISOString())
      .order("start_time", { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching activities:", error);
    return [];
  }
};

// Browser extension message handler
window.addEventListener("message", async (event) => {
  if (event.data.type === "ACTIVITY_UPDATE") {
    await trackActivity(event.data.activity);
  }
});
