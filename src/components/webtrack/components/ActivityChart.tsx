import React from "react";
import { useAuthStore } from "@/lib/auth";
import { EmptyState } from "./EmptyState";

export const ActivityChart = () => {
  const { user } = useAuthStore();
  const hasData = false; // TODO: Replace with actual data check

  if (!hasData) {
    return (
      <EmptyState
        title="No activity data yet"
        description="Your activity data will appear here once you start using the browser extension."
      />
    );
  }

  return (
    <div className="relative h-48 -mt-4 mb-4">
      {/* TODO: Implement chart visualization */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
        Chart visualization coming soon...
      </div>
    </div>
  );
};
