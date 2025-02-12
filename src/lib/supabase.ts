import { createClient } from "@supabase/supabase-js";

// For development, use these demo credentials
const supabaseUrl = "https://xyzcompany.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtdXB0cHBsZnZpaWpmeGJwdHh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNjk4MDAsImV4cCI6MjAyMjc0NTgwMH0.0C9A_RYO-SGd_dqSHQRtPRwWrQUYEJrY-K4r_tGhiG4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Note: In production, use environment variables:
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
