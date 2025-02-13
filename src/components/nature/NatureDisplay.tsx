import React, { useState, useEffect } from "react";
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
} from "lucide-react";

import { natureSounds, SoundPlayer } from "@/lib/sounds";

interface Sound {
  id: string;
  name: string;
  icon: React.ReactNode;
  volume: number;
  url: string;
  isPlaying?: boolean;
  player?: SoundPlayer;
}

const NatureDisplay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sounds, setSounds] = useState<Sound[]>([
    {
      id: "rain",
      name: "Rain",
      icon: <CloudRain className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.rain,
    },
    {
      id: "thunder",
      name: "Thunder",
      icon: <CloudLightning className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.thunder,
    },
    {
      id: "drizzle",
      name: "Drizzle",
      icon: <CloudDrizzle className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.drizzle,
    },
    {
      id: "snow",
      name: "Snow",
      icon: <CloudSnow className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.snow,
    },
    {
      id: "wind",
      name: "Wind",
      icon: <Wind className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.wind,
    },
    {
      id: "forest",
      name: "Forest",
      icon: <Trees className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.forest,
    },
    {
      id: "waves",
      name: "Ocean",
      icon: <Waves className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.waves,
    },
    {
      id: "stream",
      name: "Stream",
      icon: <Droplets className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.stream,
    },
    {
      id: "night",
      name: "Night",
      icon: <Moon className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.night,
    },
    {
      id: "birds",
      name: "Birds",
      icon: <Bird className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.birds,
    },
    {
      id: "sunrise",
      name: "Sunrise",
      icon: <Sunrise className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.sunrise,
    },
    {
      id: "sunset",
      name: "Sunset",
      icon: <Sunset className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.sunset,
    },
    {
      id: "cafe",
      name: "Café",
      icon: <Coffee className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.cafe,
    },
    {
      id: "piano",
      name: "Piano",
      icon: <Music className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.piano,
    },
    {
      id: "fireplace",
      name: "Fireplace",
      icon: <Flame className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.fireplace,
    },
    {
      id: "fan",
      name: "Fan",
      icon: <Fan className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.fan,
    },
    {
      id: "rain_umbrella",
      name: "Rain on Umbrella",
      icon: <Umbrella className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.rain_umbrella,
    },
    {
      id: "heartbeat",
      name: "Heartbeat",
      icon: <Heart className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.heartbeat,
    },
    {
      id: "leaves",
      name: "Leaves",
      icon: <Leaf className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.leaves,
    },
    {
      id: "mountain",
      name: "Mountain Wind",
      icon: <Mountain className="w-5 h-5 text-white" />,
      volume: 50,
      url: natureSounds.mountain,
    },
  ]);

  useEffect(() => {
    // Initialize sound players
    setSounds(
      sounds.map((sound) => ({
        ...sound,
        player: new SoundPlayer(sound.url),
      })),
    );

    // Cleanup on unmount
    return () => {
      sounds.forEach((sound) => sound.player?.cleanup());
    };
  }, []);

  const handleVolumeChange = (id: string, newVolume: number) => {
    setSounds(
      sounds.map((sound) => {
        if (sound.id === id) {
          sound.player?.setVolume(newVolume);
          return { ...sound, volume: newVolume };
        }
        return sound;
      }),
    );
  };

  const toggleSound = (id: string) => {
    setSounds(
      sounds.map((sound) => {
        if (sound.id === id) {
          const newIsPlaying = !sound.isPlaying;
          if (newIsPlaying) {
            sound.player?.play();
          } else {
            sound.player?.pause();
          }
          return { ...sound, isPlaying: newIsPlaying };
        }
        return sound;
      }),
    );
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-[#2A2E37] text-white p-6">
      {/* Sound Grid */}
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 max-h-[calc(100vh-180px)] overflow-y-auto custom-scrollbar py-2">
          {sounds.map((sound) => (
            <Card
              key={sound.id}
              className={`bg-[#3A3F4B] p-6 flex flex-col justify-between min-h-[120px] cursor-pointer transition-all duration-200 hover:bg-[#4A4F5B] ${sound.isPlaying ? "border-2 border-[var(--theme-accent)]" : "border-0"}`}
              onClick={() => toggleSound(sound.id)}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  {sound.icon}
                  <span className="text-sm text-white">{sound.name}</span>
                </div>
              </div>
              <div>
                <Slider
                  value={[sound.volume]}
                  max={100}
                  step={1}
                  className="w-full"
                  onValueChange={(value) =>
                    handleVolumeChange(sound.id, value[0])
                  }
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
