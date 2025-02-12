export interface ActivityEntry {
  id?: string;
  user_id: string;
  activity_type: "timer" | "stopwatch" | "webtrack";
  start_time: string;
  end_time?: string;
  duration: number;
  metadata?: {
    app_name?: string;
    window_title?: string;
    domain?: string;
    is_productive?: boolean;
    timer_duration?: number;
    stopwatch_laps?: number;
  };
}

export interface ProductivityStats {
  productive_time: number;
  distracting_time: number;
  total_time: number;
  most_productive_hour: number;
  recommended_focus_duration: number;
}
