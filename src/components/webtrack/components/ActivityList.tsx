import { ActivityData } from "../types";

export const ActivityList = ({ data }: { data: ActivityData[] }) => (
  <div className="space-y-4 mt-5">
    {data.map((item, index) => (
      <div key={index} className="flex items-center gap-4">
        <div className={`w-2 h-12 rounded-full ${item.color}`} />
        <div className="flex-1">
          <div className="text-sm font-medium">{item.name}</div>
          <div className="text-sm text-gray-400">{item.time}</div>
        </div>
      </div>
    ))}
  </div>
);
