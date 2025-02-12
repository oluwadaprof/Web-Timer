import React, { useState } from "react";
import { Card } from "../ui/card";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import {
  Cloud,
  Wind,
  Waves,
  Droplets,
  Trees,
  Moon,
  Coffee,
  Play,
  Pause,
  Bird,
  Sunrise,
  Sunset,
  CloudRain,
  CloudLightning,
  CloudDrizzle,
  CloudSnow,
  Music,
  Flame,
  Fan,
  Umbrella,
  Heart,
  Leaf,
  Mountain,
  Snowflake,
  VolumeX,
  Volume2,
} from "lucide-react";

interface Sound {
  id: string;
  name: string;
  icon: React.ReactNode;
  volume: number;
  url: string;
  isMuted?: boolean;
  audio?: HTMLAudioElement;
}

const NatureDisplay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sounds, setSounds] = useState<Sound[]>([
    {
      id: "rain",
      name: "Rain",
      icon: <CloudRain className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/rain.mp3",
    },
    {
      id: "thunder",
      name: "Thunder",
      icon: <CloudLightning className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/thunder.mp3",
    },
    {
      id: "drizzle",
      name: "Drizzle",
      icon: <CloudDrizzle className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/drizzle.mp3",
    },
    {
      id: "snow",
      name: "Snow",
      icon: <CloudSnow className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/snow.mp3",
    },
    {
      id: "wind",
      name: "Wind",
      icon: <Wind className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/wind.mp3",
    },
    {
      id: "forest",
      name: "Forest",
      icon: <Trees className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/forest.mp3",
    },
    {
      id: "waves",
      name: "Ocean",
      icon: <Waves className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/waves.mp3",
    },
    {
      id: "stream",
      name: "Stream",
      icon: <Droplets className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/stream.mp3",
    },
    {
      id: "night",
      name: "Night",
      icon: <Moon className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/night.mp3",
    },
    {
      id: "birds",
      name: "Birds",
      icon: <Bird className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/birds.mp3",
    },
    {
      id: "sunrise",
      name: "Sunrise",
      icon: <Sunrise className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/sunrise.mp3",
    },
    {
      id: "sunset",
      name: "Sunset",
      icon: <Sunset className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/sunset.mp3",
    },
    {
      id: "cafe",
      name: "Café",
      icon: <Coffee className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/cafe.mp3",
    },
    {
      id: "piano",
      name: "Piano",
      icon: <Music className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/piano.mp3",
    },
    {
      id: "fireplace",
      name: "Fireplace",
      icon: <Flame className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/fireplace.mp3",
    },
    {
      id: "fan",
      name: "Fan",
      icon: <Fan className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/fan.mp3",
    },
    {
      id: "rain_umbrella",
      name: "Rain on Umbrella",
      icon: <Umbrella className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/rain_umbrella.mp3",
    },
    {
      id: "heartbeat",
      name: "Heartbeat",
      icon: <Heart className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/heartbeat.mp3",
    },
    {
      id: "leaves",
      name: "Leaves",
      icon: <Leaf className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/leaves.mp3",
    },
    {
      id: "mountain",
      name: "Mountain Wind",
      icon: <Mountain className="w-5 h-5 text-white" />,
      volume: 50,
      url: "https://cdn.example.com/mountain.mp3",
    },
  ]);

  const handleVolumeChange = (id: string, newVolume: number) => {
    setSounds(
      sounds.map((sound) =>
        sound.id === id ? { ...sound, volume: newVolume } : sound,
      ),
    );
  };

  const toggleMute = (id: string) => {
    setSounds(
      sounds.map((sound) =>
        sound.id === id ? { ...sound, isMuted: !sound.isMuted } : sound,
      ),
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#2A2E37] text-white p-6">
      {/* Top Controls */}
      <div className="flex justify-center items-center mb-8">
        <Button
          variant="ghost"
          size="lg"
          className={`w-16 h-16 rounded-full ${isPlaying ? "bg-[#7B89F4] hover:bg-[#8B99FF]" : "bg-[#3A3F4B] hover:bg-[#4A4F5B]"}`}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {isPlaying ? (
            <Pause className="w-6 h-6 text-white" />
          ) : (
            <Play className="w-6 h-6 text-white" />
          )}
        </Button>
      </div>

      {/* Sound Grid */}
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar py-2">
          {sounds.map((sound) => (
            <Card
              key={sound.id}
              className="bg-[#3A3F4B] border-0 p-6 flex flex-col justify-between min-h-[160px]"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    {sound.icon}
                    <span className="text-sm text-white">{sound.name}</span>
                  </div>
                  <button
                    className={`p-1 rounded-full hover:bg-[#4A4F5B] transition-colors ${sound.isMuted ? "text-red-400" : "text-white"}`}
                    onClick={() => toggleMute(sound.id)}
                  >
                    {sound.isMuted ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <Slider
                  value={[sound.isMuted ? 0 : sound.volume]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) =>
                    handleVolumeChange(sound.id, value[0])
                  }
                  disabled={sound.isMuted}
                />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #2a2e37;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #3a3f4b;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #4a4f5b;
        }
      `}</style>
    </div>
  );
};

export default NatureDisplay;
