import React, { useState, useEffect } from "react";
import {
  searchCities,
  getAllCities,
  updateCityTimes,
  useCityStore,
  type City,
} from "@/lib/cities";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Search, MapPin, Heart, HeartOff, Cloud, X } from "lucide-react";
import CityDetailView from "./CityDetailView";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

const WorldClockDisplay = () => {
  const { cities, favorites, setCities, toggleFavorite } = useCityStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeCities = async () => {
      const initialCities = await getAllCities();
      setCities(initialCities);
      setLoading(false);
    };

    initializeCities();
  }, [setCities]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (cities.length > 0) {
        updateCityTimes(cities);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cities]);

  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery) {
        const results = await searchCities(searchQuery);
        setCities(results);
      } else {
        const initialCities = await getAllCities();
        setCities(initialCities);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [searchQuery, setCities]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100vh-80px)] bg-[#2A2E37] flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-80px)] bg-[#2A2E37] p-6 text-white">
      {selectedCity ? (
        <CityDetailView
          city={selectedCity}
          onBack={() => setSelectedCity(null)}
        />
      ) : (
        <div className="w-full space-y-6">
          <div className="flex justify-center mb-6">
            <div className="relative w-[600px]">
              <div className="relative flex items-center">
                <Search className="absolute left-4 w-6 h-6 text-gray-400" />
                <Input
                  className="h-14 pl-12 pr-12 bg-[#3A3F4B] border-0 rounded-full text-lg text-white placeholder:text-gray-400"
                  placeholder="Type to search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="absolute right-4 p-1 rounded-full hover:bg-[#4A4F5B] transition-colors"
                  onClick={() => setSearchQuery("")}
                >
                  {searchQuery && (
                    <div className="w-6 h-6 flex items-center justify-center bg-[#7B89F4] rounded-full">
                      <X className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)] rounded-md border-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
              {cities.map((city) => (
                <Card
                  key={city.id}
                  className="p-4 space-y-4 bg-[#3A3F4B] border-0 text-white hover:bg-[#4A4F5B] transition-colors cursor-pointer"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-2">
                        <img
                          src={city.flag}
                          alt={`${city.name} flag`}
                          className="w-6 h-4 object-cover rounded"
                        />
                        <h3 className="font-semibold text-lg">{city.name}</h3>
                      </div>
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
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(city.id);
                            }}
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
                      {city.localTime ||
                        new Date().toLocaleTimeString("en-US", {
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
      )}
    </div>
  );
};

export default WorldClockDisplay;
