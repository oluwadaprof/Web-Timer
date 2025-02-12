import { CHART_COLORS } from "../constants";

export const ActivityChart = () => {
  return (
    <div className="relative h-48 -mt-4 mb-4">
      <div className="absolute inset-0 bg-gradient-to-b from-[#7B89F4]/10 to-transparent rounded-lg"></div>
      <div className="relative h-full flex items-end gap-2">
        {Array.from({ length: 24 }, (_, i) => {
          const height = Math.random() * 100;
          const getColor = (h: number) => {
            if (h > 75) return CHART_COLORS.high;
            if (h > 50) return CHART_COLORS.medium;
            if (h > 25) return CHART_COLORS.low;
            return CHART_COLORS.veryLow;
          };
          return (
            <div
              key={i}
              className={`flex-1 ${getColor(height)} rounded-t-sm transition-all duration-300 hover:opacity-80 group relative`}
              style={{ height: `${height}%` }}
            >
              <div className="invisible group-hover:visible absolute -top-6 left-1/2 -translate-x-1/2 bg-[#2A2E37] px-2 py-1 rounded text-xs whitespace-nowrap">
                {Math.round(height)}% active
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>12 AM</span>
        <span>6 AM</span>
        <span>12 PM</span>
        <span>6 PM</span>
        <span>12 AM</span>
      </div>
    </div>
  );
};
