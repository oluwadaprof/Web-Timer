import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Square, Pause, Play, RotateCcw } from "lucide-react";

interface Lap {
  overall: number;
  lap: number;
  lapNumber: number;
}

const StopwatchDisplay = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const [lastLapTime, setLastLapTime] = useState<number>(0);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}:${milliseconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    trackStopwatchSession(time, laps.length);
    setTime(0);
    setLaps([]);
    setLastLapTime(0);
  };

  const handleLap = useCallback(() => {
    const lapTime = time - lastLapTime;
    setLaps((prevLaps) => [
      {
        overall: time,
        lap: lapTime,
        lapNumber: prevLaps.length + 1,
      },
      ...prevLaps,
    ]);
    setLastLapTime(time);
  }, [time, lastLapTime]);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-[#2A2E37] text-white">
      {/* Main Stopwatch Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <h2 className="text-2xl mb-4 tracking-wider">STOPWATCH</h2>
        <div className="text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-light tracking-wider mb-8">
          {formatTime(time)}
        </div>
        <div className="text-purple-400 text-lg mb-12">
          {isRunning ? "Active now" : "Stopped"}
        </div>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#3A3F4B] hover:bg-[#4A4F5B]"
            onClick={handleReset}
          >
            <RotateCcw className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
          <Button
            size="icon"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--theme-accent)] hover:bg-[var(--theme-accent-hover)] transition-colors"
            onClick={handleStartStop}
          >
            {isRunning ? (
              <Pause className="h-5 w-5 sm:h-6 sm:w-6" />
            ) : (
              <Play className="h-5 w-5 sm:h-6 sm:w-6" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#3A3F4B] hover:bg-[#4A4F5B]"
            onClick={handleLap}
            disabled={!isRunning}
          >
            <span className="text-sm sm:text-base">LAP</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[#3A3F4B] hover:bg-[#4A4F5B]"
            onClick={() => {
              setTime(0);
              setLaps([]);
              setLastLapTime(0);
              setIsRunning(false);
            }}
          >
            <Square className="h-5 w-5 sm:h-6 sm:w-6" />
          </Button>
        </div>
      </div>

      {/* Laps Table */}
      <div className="w-full lg:w-[500px] lg:border-l border-[#3A3F4B] p-4 lg:p-8 overflow-hidden mt-8 lg:mt-0">
        <div className="flex justify-between text-sm text-gray-400 mb-4 px-4">
          <span>OVERALL</span>
          <span>LAP TIME</span>
          <span>LAP</span>
        </div>
        <div className="flex flex-col gap-2 h-[200px] lg:h-[calc(100vh-220px)] overflow-y-auto custom-scrollbar">
          {laps.map((lap) => (
            <div
              key={lap.lapNumber}
              className="flex justify-between items-center text-lg px-4 w-full lg:w-auto bg-[#3A3F4B] lg:bg-transparent rounded-lg lg:rounded-none p-3 lg:p-0"
            >
              <span className="font-light">{formatTime(lap.overall)}</span>
              <span className="font-light">{formatTime(lap.lap)}</span>
              <span className="text-gray-400">{lap.lapNumber}</span>
            </div>
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

export default StopwatchDisplay;
