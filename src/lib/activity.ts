import { supabase } from "./supabase";
import { useAuthStore } from "./auth";
import type { ActivityEntry, ProductivityStats } from "./types";

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

export const calculateProductivityStats = async (
  activities: ActivityEntry[],
): Promise<ProductivityStats> => {
  const productiveActivities = activities.filter(
    (a) => a.metadata?.is_productive,
  );
  const distractingActivities = activities.filter(
    (a) => !a.metadata?.is_productive,
  );

  const productiveTime = productiveActivities.reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const distractingTime = distractingActivities.reduce(
    (acc, curr) => acc + curr.duration,
    0,
  );
  const totalTime = productiveTime + distractingTime;

  // Calculate most productive hour
  const hourlyProductivity = new Array(24).fill(0);
  productiveActivities.forEach((activity) => {
    const hour = new Date(activity.start_time).getHours();
    hourlyProductivity[hour] += activity.duration;
  });

  const mostProductiveHour = hourlyProductivity.indexOf(
    Math.max(...hourlyProductivity),
  );

  // Calculate recommended focus duration based on past successful sessions
  const successfulSessions = activities.filter(
    (a) =>
      a.activity_type === "timer" &&
      a.metadata?.timer_duration &&
      a.metadata?.is_productive,
  );

  const recommendedDuration =
    successfulSessions.length > 0
      ? Math.round(
          successfulSessions.reduce(
            (acc, curr) => acc + (curr.metadata?.timer_duration || 0),
            0,
          ) / successfulSessions.length,
        )
      : 25 * 60; // Default to 25 minutes if no data

  return {
    productive_time: productiveTime,
    distracting_time: distractingTime,
    total_time: totalTime,
    most_productive_hour: mostProductiveHour,
    recommended_focus_duration: recommendedDuration,
  };
};

// Track timer completion
export const trackTimerCompletion = async (
  duration: number,
  completed: boolean,
) => {
  await trackActivity({
    activity_type: "timer",
    start_time: new Date().toISOString(),
    duration,
    metadata: {
      timer_duration: duration,
      is_productive: completed,
    },
  });
};

// Track stopwatch session
export const trackStopwatchSession = async (duration: number, laps: number) => {
  await trackActivity({
    activity_type: "stopwatch",
    start_time: new Date().toISOString(),
    duration,
    metadata: {
      stopwatch_laps: laps,
    },
  });
};

// Track web activity
export const trackWebActivity = async (
  appName: string,
  windowTitle: string,
  duration: number,
  isProductive: boolean,
) => {
  await trackActivity({
    activity_type: "webtrack",
    start_time: new Date().toISOString(),
    duration,
    metadata: {
      app_name: appName,
      window_title: windowTitle,
      is_productive: isProductive,
    },
  });
};
