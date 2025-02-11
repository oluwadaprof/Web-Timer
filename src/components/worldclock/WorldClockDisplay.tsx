import React, { useState, useEffect } from "react";
import { searchCities, getAllCities, type City } from "@/lib/cities";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Search, MapPin, Heart, HeartOff, Cloud } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface WorldClockDisplayProps {
  cities?: City[];
  onSearch?: (query: string) => void;
  onToggleFavorite?: (cityId: string) => void;
}

const defaultCities = getAllCities().slice(0, 9);

const WorldClockDisplay = ({
  cities = defaultCities,
  onSearch = () => {},
  onToggleFavorite = () => {},
}: WorldClockDisplayProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [displayedCities, setDisplayedCities] = useState(defaultCities);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const results = searchCities(searchQuery);
      setDisplayedCities(
        results.map((city) => ({
          ...city,
          isFavorite: favorites.includes(city.id),
        })),
      );
    } else {
      setDisplayedCities(
        defaultCities.map((city) => ({
          ...city,
          isFavorite: favorites.includes(city.id),
        })),
      );
    }
  }, [searchQuery, favorites]);

  const handleToggleFavorite = (cityId: string) => {
    setFavorites((prev) => {
      if (prev.includes(cityId)) {
        return prev.filter((id) => id !== cityId);
      }
      return [...prev, cityId];
    });
  };

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#2A2E37] p-6 text-white">
      <div className="w-full space-y-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-10"
              placeholder="Search cities..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)] rounded-md border-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {displayedCities.map((city) => (
              <Card
                key={city.id}
                className="p-4 space-y-4 bg-[#3A3F4B] border-0 text-white hover:bg-[#4A4F5B] transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{city.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mr-1" />
                      {city.timezone}
                    </div>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleToggleFavorite(city.id)}
                        >
                          {city.isFavorite ? (
                            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                          ) : (
                            <HeartOff className="w-5 h-5" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {city.isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"}
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">
                    {new Date().toLocaleTimeString("en-US", {
                      timeZone: city.timezone,
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="w-5 h-5" />
                    <span>{city.temperature}°C</span>
                  </div>
                </div>

                <div className="text-sm text-muted-foreground">
                  {city.weather}
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default WorldClockDisplay;
