import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft, MapPin, Cloud } from "lucide-react";
import type { City } from "@/lib/cities";

interface CityDetailViewProps {
  city: City;
  onBack: () => void;
}

const CityDetailView = ({ city, onBack }: CityDetailViewProps) => {
  return (
    <div className="h-full flex flex-col">
      <Button
        variant="ghost"
        size="icon"
        className="text-white mb-6 hover:bg-[#3A3F4B] self-start"
        onClick={onBack}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>

      <div className="flex-1 flex flex-col items-center justify-center -mt-20">
        <h2 className="text-4xl font-bold mb-4">{city.name}</h2>
        <div className="flex items-center text-lg text-muted-foreground mb-8">
          <MapPin className="w-5 h-5 mr-2" />
          {city.timezone}
        </div>

        <div className="text-[200px] font-light mb-8">
          {new Date().toLocaleTimeString("en-US", {
            timeZone: city.timezone,
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        <div className="flex items-center gap-4 text-2xl">
          <Cloud className="w-8 h-8" />
          <span>{city.temperature}°C</span>
          <span className="text-muted-foreground">{city.weather}</span>
        </div>
      </div>
    </div>
  );
};

export default CityDetailView;
