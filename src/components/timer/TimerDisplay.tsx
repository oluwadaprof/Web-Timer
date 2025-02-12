import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

import { Play, Pause, RotateCcw, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { trackTimerCompletion } from "@/lib/activity";

interface TimerDisplayProps {
  initialTime?: number; // in seconds
  onComplete?: () => void;
  onTimeChange?: (time: number) => void;
}

const TimerDisplay = ({
  initialTime = 300,
  onComplete = () => {},
  onTimeChange = () => {},
}: TimerDisplayProps) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAddMode, setIsAddMode] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          setProgress(((initialTime - newTime) / initialTime) * 100);
          if (newTime === 0) {
            setIsRunning(false);
            onComplete();
            trackTimerCompletion(initialTime, true);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, initialTime, onComplete]);

  useEffect(() => {
    onTimeChange(timeLeft);
  }, [timeLeft, onTimeChange]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const adjustTime = (amount: number) => {
    const newTime = Math.max(0, timeLeft + amount);
    setTimeLeft(newTime);
    setProgress(((initialTime - newTime) / initialTime) * 100);
  };

  const handleReset = () => {
    if (isRunning) {
      trackTimerCompletion(timeLeft, false);
    }
    setTimeLeft(initialTime);
    setProgress(0);
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] w-full bg-[#2A2E37] text-white relative px-4">
      {/* Timer Display */}
      <div className="flex justify-center -mt-10 h-[300px] relative">
        {/* Timer Text */}
        <AnimatePresence mode="popLayout">
          {formatTime(timeLeft)
            .split("")
            .map((digit, index) => (
              <motion.span
                key={`${index}-${digit}`}
                className={`text-[120px] sm:text-[200px] md:text-[300px] lg:text-[370px] font-normal tracking-wider inline-block w-[60px] sm:w-[100px] md:w-[140px] lg:w-[180px] text-center ${timeLeft < 60 ? "text-red-500" : "text-white"}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                {digit}
              </motion.span>
            ))}
        </AnimatePresence>
      </div>

      {/* Quick Add Buttons Group */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6 mt-[15rem]">
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#3A3F4B] w-12 h-12"
          onClick={() => setIsAddMode(!isAddMode)}
        >
          {isAddMode ? (
            <Plus className="h-6 w-6" />
          ) : (
            <Minus className="h-6 w-6" />
          )}
        </Button>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white min-w-[80px]"
            onClick={() => adjustTime(isAddMode ? 30 : -30)}
          >
            {isAddMode ? "+" : "-"}0:30
          </Button>
          <Button
            variant="secondary"
            className="bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white min-w-[80px]"
            onClick={() => adjustTime(isAddMode ? 60 : -60)}
          >
            {isAddMode ? "+" : "-"}1:00
          </Button>
          <Button
            variant="secondary"
            className="bg-[#3A3F4B] hover:bg-[#4A4F5B] text-white min-w-[80px]"
            onClick={() => adjustTime(isAddMode ? 300 : -300)}
          >
            {isAddMode ? "+" : "-"}5:00
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-[#3A3F4B] w-12 h-12"
          onClick={handleReset}
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </div>

      {/* Play/Pause/Reset Button */}
      <div className="flex justify-center w-full px-6">
        {timeLeft === 0 ? (
          <Button
            className="w-full max-w-[600px] h-14 bg-[#7B89F4] hover:bg-[#8B99FF] text-white gap-2 rounded-full text-lg font-medium"
            onClick={handleReset}
          >
            <RotateCcw className="h-5 w-5" />
            Reset
          </Button>
        ) : (
          <Button
            className="w-full max-w-[600px] h-14 bg-[#7B89F4] hover:bg-[#8B99FF] text-white gap-2 rounded-full text-lg font-medium"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Pause className="h-5 w-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="h-5 w-5" />
                Start
              </>
            )}
          </Button>
        )}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0">
        <div
          className={`h-2 rounded-full transition-all duration-300 ease-in-out ${timeLeft < 60 ? "bg-red-500" : "bg-[#7B89F4]"}`}
          style={{
            width: `${progress}%`,
            opacity: isRunning ? 1 : 0.5,
          }}
        />
      </div>
    </div>
  );
};

export default TimerDisplay;
